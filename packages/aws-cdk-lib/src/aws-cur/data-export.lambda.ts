import {
  BCMDataExportsClient,
  CreateExportCommand,
  CreateExportCommandInput,
  DeleteExportCommand,
  // DeleteExportCommand,
  Export,
  UpdateExportCommand,
  // UpdateExportCommand,
} from '@aws-sdk/client-bcm-data-exports';
import {
  CdkCustomResourceEvent,
  CdkCustomResourceHandler,
  CdkCustomResourceResponse,
  CloudFormationCustomResourceCreateEvent,
  CloudFormationCustomResourceDeleteEvent,
  CloudFormationCustomResourceUpdateEvent,
  Context,
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
  readonly IncludeResourceIds: string;
  readonly SplitCostAllocationData: string;
  readonly SelectedColumns: string[];
}

export const handler: CdkCustomResourceHandler = async (
  event: CdkCustomResourceEvent,
  context: Context,
): Promise<CdkCustomResourceResponse> => {
  try {
    switch (event.RequestType) {
      case 'Create':
        return await createDataExport(
          event as CloudFormationCustomResourceCreateEvent,
          context,
        );
      case 'Update':
        return await updateDataExport(
          event as CloudFormationCustomResourceUpdateEvent,
          context,
        );
      case 'Delete':
        return await deleteDataExport(
          event as CloudFormationCustomResourceDeleteEvent,
          context,
        );
    }
  } catch (error) {
    // Handle error
    console.error('Error:', error);
    throw error;
  }
};

const createResponse = (
  event: CdkCustomResourceEvent,
  context: Context,
): CdkCustomResourceResponse => {
  return {
    StackId: event.StackId,
    RequestId: event.RequestId,
    LogicalResourceId: event.LogicalResourceId,
    PhysicalResourceId: context.logGroupName,
  };
};
const createDataExport = async (
  event: CloudFormationCustomResourceCreateEvent,
  context: Context,
): Promise<CdkCustomResourceResponse> => {
  const props = event.ResourceProperties as Cur2ExportParameters;
  const client = new BCMDataExportsClient();
  const command = new CreateExportCommand({
    Export: cur2ExportParametersToExport(props),
  } as CreateExportCommandInput);

  const createExportResp = await client.send(command);
  return {
    ...createResponse(event, context),
    PhysicalResourceId: createExportResp.ExportArn,
    Status: 'SUCCESS',
  };
};

const updateDataExport = async (
  event: CloudFormationCustomResourceUpdateEvent,
  context: Context,
): Promise<CdkCustomResourceResponse> => {
  const props = event.ResourceProperties as Cur2ExportParameters;
  const client = new BCMDataExportsClient();
  const command = new UpdateExportCommand({
    ExportArn: event.PhysicalResourceId,
    Export: cur2ExportParametersToExport(props),
  });
  const updateExportResp = await client.send(command);
  return {
    ...createResponse(event, context),
    PhysicalResourceId: updateExportResp.ExportArn,
    Status: 'SUCCESS',
  };
};

const deleteDataExport = async (
  event: CloudFormationCustomResourceDeleteEvent,
  context: Context,
): Promise<CdkCustomResourceResponse> => {
  const client = new BCMDataExportsClient();
  const command = new DeleteExportCommand({
    ExportArn: event.PhysicalResourceId,
  });
  const deleteExportResp = await client.send(command);
  return {
    ...createResponse(event, context),
    PhysicalResourceId: deleteExportResp.ExportArn,
    Status: 'SUCCESS',
  };
};

const cur2ExportParametersToExport = (props: Cur2ExportParameters): Export => {
  return {
    Name: props.ExportName,
    Description: props.ExportDescription || '',
    DataQuery: {
      QueryStatement: buildSQL(props.SelectedColumns),
      TableConfigurations: {
        COST_AND_USAGE_REPORT: {
          TIME_GRANULARITY: props.TimeUnit,
          INCLUDE_RESOURCES: /^true$/i.test(props.IncludeResourceIds)
            ? 'TRUE'
            : 'FALSE',
          INCLUDE_SPLIT_COST_ALLOCATION_DATA: /^true$/i.test(
            props.SplitCostAllocationData,
          )
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
            props.CompressionFormat === 'GZIP_CSV' ? 'TEXT_OR_CSV' : 'PARQUET',
          Compression:
            props.CompressionFormat === 'GZIP_CSV' ? 'GZIP' : 'PARQUET',
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

const buildSQL = (columns: string[]): string => {
  return `SELECT ${columns.join(', ')} FROM COST_AND_USAGE_REPORT`;
};

export const testModules = {
  cur2ExportParametersToExport: cur2ExportParametersToExport,
};
