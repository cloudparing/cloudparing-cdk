import { CompressionFormat, ExportVersioning } from '../../src/aws-cur/data-export-definition.types';
import {
  testModules,
  Cur2ExportParameters,
} from '../../src/aws-cur/data-export.lambda';
import { TimeUnit } from '../../src/aws-cur/report-definition.types';

describe('Custom Handler: Create Data Export', () => {
  describe('createDataExport', () => {
    const props = {
      ServiceToken: '',
      ExportType: 'COST_AND_USAGE',
      ExportName: 'EXPORT_NAME',
      ExportDescription: 'EXPORT DESCRIPTION',
      S3Bucket: 'S3_BUCKET',
      S3Prefix: 'S3_PREFIX',
      S3Region: 'S3_Region',
      TimeUnit: 'DAILY',
      CompressionFormat: 'GZIP_CSV',
      ExportVersioning: 'OVERWRITE_EXPORT',
      IncludeResourceIds: 'false',
      SplitCostAllocationData: 'false',
      SelectedColumns: [],
    } as Cur2ExportParameters;

    [
      { input: 'true', output: 'TRUE' },
      { input: 'false', output: 'FALSE' },
    ].forEach((arg) => {
      it('COST_AND_USAGE_REPORT INCLUDE_RESOURCES transform', async () => {});
      const exp = testModules.cur2ExportParametersToExport({
        ...props,
        IncludeResourceIds: arg.input,
      });
      expect(
        exp.DataQuery?.TableConfigurations?.COST_AND_USAGE_REPORT,
      ).toBeDefined();
      expect(
        exp.DataQuery?.TableConfigurations?.COST_AND_USAGE_REPORT
          ?.INCLUDE_RESOURCES,
      ).toBe(arg.output);
    });

    [
      { input: 'true', output: 'TRUE' },
      { input: 'false', output: 'FALSE' },
    ].forEach((arg) => {
      it('COST_AND_USAGE_REPORT INCLUDE_RESOURCES transform', async () => {});
      const exp = testModules.cur2ExportParametersToExport({
        ...props,
        SplitCostAllocationData: arg.input,
      });
      expect(
        exp.DataQuery?.TableConfigurations?.COST_AND_USAGE_REPORT,
      ).toBeDefined();
      expect(
        exp.DataQuery?.TableConfigurations?.COST_AND_USAGE_REPORT
          ?.INCLUDE_SPLIT_COST_ALLOCATION_DATA,
      ).toBe(arg.output);
    });

    ['HOURLY', 'DAILY', 'MONTHLY'].forEach((arg) => {
      it('COST_AND_USAGE_REPORT TIME_GRANULARITY transform', async () => {
        const exp = testModules.cur2ExportParametersToExport({
          ...props,
          TimeUnit: arg as TimeUnit,
        });
        expect(
          exp.DataQuery?.TableConfigurations?.COST_AND_USAGE_REPORT,
        ).toBeDefined();
        expect(
          exp.DataQuery?.TableConfigurations?.COST_AND_USAGE_REPORT
            ?.TIME_GRANULARITY,
        ).toBe(arg);
      });
    });

    it('S3Destination transform', async () => {
      const exp = testModules.cur2ExportParametersToExport(props);
      expect(exp.Name).toBe('EXPORT_NAME');
      expect(exp.DestinationConfigurations?.S3Destination?.S3Bucket).toBe(
        'S3_BUCKET',
      );
      expect(exp.DestinationConfigurations?.S3Destination?.S3Prefix).toBe(
        'S3_PREFIX',
      );
      expect(exp.DestinationConfigurations?.S3Destination?.S3Region).toBe(
        'S3_Region',
      );
    });

    [
      { input: 'GZIP_CSV', compression: 'GZIP', format: 'TEXT_OR_CSV' },
      { input: 'Parquet', compression: 'PARQUET', format: 'PARQUET' },
    ].forEach((arg) => {
      it('S3OutputConfigurations transform', async () => {
        const exp = testModules.cur2ExportParametersToExport({
          ...props,
          CompressionFormat: arg.input as CompressionFormat,
        });
        expect(
          exp.DestinationConfigurations?.S3Destination?.S3OutputConfigurations
            ?.Compression,
        ).toBe(arg.compression);
        expect(
          exp.DestinationConfigurations?.S3Destination?.S3OutputConfigurations
            ?.Format,
        ).toBe(arg.format);
      });
    });

    [
      { input: 'OVERWRITE_EXPORT', overwrite: 'OVERWRITE_REPORT' },
      { input: 'CREATE_NEW_EXPORT', overwrite: 'CREATE_NEW_REPORT' },
    ].forEach((arg) => {
      it('S3OutputConfigurations transform', async () => {
        const exp = testModules.cur2ExportParametersToExport({
          ...props,
          ExportVersioning: arg.input as ExportVersioning,
        });
        expect(
          exp.DestinationConfigurations?.S3Destination?.S3OutputConfigurations
            ?.Overwrite,
        ).toBe(arg.overwrite);
      });
    });
  });
});
