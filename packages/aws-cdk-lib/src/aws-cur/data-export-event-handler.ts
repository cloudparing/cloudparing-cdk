import {
  BCMDataExportsClient,
  CreateExportCommand,
  CreateExportCommandInput,
  DeleteExportCommand,
  Export,
  ExportReference,
  ListExportsCommand,
  ListExportsResponse,
  UpdateExportCommand,
} from '@aws-sdk/client-bcm-data-exports';
import {
  CloudFormationCustomResourceCreateEvent,
  CloudFormationCustomResourceDeleteEvent,
  CloudFormationCustomResourceEvent,
  CloudFormationCustomResourceHandler,
  CloudFormationCustomResourceUpdateEvent,
} from 'aws-lambda';
import {
  CompressionFormat,
  ExportVersioning,
} from './data-export-definition.types';
import { TimeUnit } from './report-definition.types';

export interface Cur2ExportParameters {
  readonly ServiceToken: string;
  readonly ExportType: 'COST_AND_USAGE';
  readonly ExportName: string;
  readonly ExportDescription: string;
  readonly S3Bucket: string;
  readonly S3Prefix: string;
  readonly S3Region: string;
  readonly TimeUnit: TimeUnit;
  readonly CompressionFormat: CompressionFormat;
  readonly ExportVersioning: ExportVersioning;
  readonly IncludeResourceIds: boolean;
  readonly SplitCostAllocationData: boolean;
  readonly SelectedColumns: string[];
}

export const handler: CloudFormationCustomResourceHandler = async (
  event: CloudFormationCustomResourceEvent,
): Promise<void> => {
  try {
    switch (event.RequestType) {
      case 'Create':
        return await createDataExport(
          event as CloudFormationCustomResourceCreateEvent,
        );
      case 'Update':
        return await updateDataExport(
          event as CloudFormationCustomResourceUpdateEvent,
        );
      case 'Delete':
        return await deleteDataExport(
          event as CloudFormationCustomResourceDeleteEvent,
        );
    }
  } catch (error) {
    // Handle error
    console.error('Error:', error);
    throw error;
  }
};
const createDataExport = async (
  event: CloudFormationCustomResourceCreateEvent,
): Promise<void> => {
  const props = event.ResourceProperties as Cur2ExportParameters;
  const client = new BCMDataExportsClient();
  const command = new CreateExportCommand({
    Export: cur2ExportParametersToExport(props),
  } as CreateExportCommandInput);
  await client.send(command);
};

const updateDataExport = async (
  event: CloudFormationCustomResourceUpdateEvent,
): Promise<void> => {
  const props = event.ResourceProperties as Cur2ExportParameters;
  const client = new BCMDataExportsClient();
  const foundExport = await findExportByName(client, props.ExportName);
  if (!foundExport) {
    throw new Error(`Export with name '${props.ExportName}' not found`);
  }

  const command = new UpdateExportCommand({
    ExportArn: foundExport.ExportArn,
    Export: cur2ExportParametersToExport(props),
  });
  await client.send(command);
};

const deleteDataExport = async (
  event: CloudFormationCustomResourceDeleteEvent,
): Promise<void> => {
  const props = event.ResourceProperties as Cur2ExportParameters;
  const client = new BCMDataExportsClient();
  const foundExport = await findExportByName(client, props.ExportName);
  if (!foundExport) {
    throw new Error(`Export with name '${props.ExportName}' not found`);
  }
  const command = new DeleteExportCommand({
    ExportArn: foundExport.ExportArn,
  });
  await client.send(command);
};

const cur2ExportParametersToExport = (props: Cur2ExportParameters): Export => {
  return {
    Name: props.ExportName,
    Description: props.ExportDescription || '',
    DataQuery: {
      QueryStatement: buildSQL(props.SelectedColumns),
      TableConfigurations: {
        COST_AND_USAGE_REPORT: {
          TIME_GRANULARITY: props.TimeUnit || 'DAILY',
          INCLUDE_RESOURCES: props.IncludeResourceIds ? 'TRUE' : 'FALSE',
          INCLUDE_SPLIT_COST_ALLOCATION_DATA: props.SplitCostAllocationData
            ? 'TRUE'
            : 'FALSE',
          INCLUDE_MANUAL_DISCOUNT_COMPATIBILITY: 'FALSE',
        },
      },
    },
    DestinationConfigurations: {
      S3Destination: {
        S3Bucket: props.S3Bucket,
        S3Prefix: props.S3Prefix,
        S3Region: props.S3Region,
        S3OutputConfigurations: {
          OutputType: 'CUSTOM',
          Format:
            props.CompressionFormat === 'Parquet' ? 'PARQUET' : 'TEXT_OR_CSV',
          Compression:
            props.CompressionFormat === 'Parquet' ? 'PARQUET' : 'GZIP',
          Overwrite:
            props.ExportVersioning === 'OVERWRITE_EXPORT'
              ? 'OVERWRITE_REPORT'
              : 'CREATE_NEW_REPORT',
        },
      },
    },
    RefreshCadence: {
      Frequency: 'SYNCHRONOUS',
    },
  };
};

const findExportByName = async (
  client: BCMDataExportsClient,
  name: string,
): Promise<ExportReference | undefined> => {
  let nextToken: string | undefined = undefined;

  do {
    const exports = (await client.send(
      new ListExportsCommand({
        MaxResults: 50,
        NextToken: nextToken,
      }),
    )) as ListExportsResponse;
    if (exports.Exports === undefined) {
      return undefined;
    }
    for (const exp of exports.Exports) {
      if (exp.ExportName === name) {
        return exp;
      }
    }
    nextToken = exports.NextToken;
  } while (nextToken);

  return undefined;
};

const buildSQL = (columns: string[]): string => {
  return `SELECT ${columns.join(', ')} FROM COST_AND_USAGE_REPORT`;
};
