import * as cdk from 'aws-cdk-lib';

export type ExportTimeUnit = 'HOURLY' | 'DAILY' | 'MONTHLY';

export type CompressionFormat = 'GZIP_CSV' | 'Parquet';
export type ExportVersioning = 'CREATE_NEW_EXPORT' | 'OVERWRITE_EXPORT';

export interface DataExportDefinitionProps
  extends Cur2ExportOptions,
  DataExportStorageOptions {
  /**
   * Properties to pass to the Lambda
   *
   * @default - No properties.
   */
  readonly properties?: {
    [key: string]: any;
  };
}

export interface Cur2ExportOptions {
  /**
   * The name of this specific data export.
   */
  readonly name: string | undefined;

  /**
   * The description for this specific data export.
   */
  readonly description?: string;
}

export interface Cur2ContentOptions {
  /**
   * Include a column containing the unique AWS resource ID for applicable
   * line items. Including individual resource IDs in your export might
   * increase the file size
   *
   * @default false
   */
  readonly includeResourceIds?: boolean;

  /**
   * Include detailed cost and usage for shared resources for cost allocation
   * (only available for Amazon ECS). Including these resources introduces new
   * rows and columns in the Cost and Usage Report and might increase the file size
   *
   * @default false
   */
  readonly splitCostAllocationData?: boolean;

  /**
   * The time granularity for how you want the line items in the export to be aggregated.
   *
   * @default HOURLY
   *
   */
  readonly timeUnit?: ExportTimeUnit;

  /**
   * The columns that you want to include in your data query. This allows
   * you to create exports with consistent schemas, remove sensitive cost data,
   * and reduce the file size of the export. By default, all columns are selected
   *
   * @default false
   */
  readonly columns?: string[];
}

export interface Cur2DeliveryOptions {
  /**
   * The compression type and file format for your export.
   *
   * @default GZIP_CSV
   *
   */
  readonly compressionFormat?: CompressionFormat;

  /**
   * Whether you want each version of the data export file to overwrite the
   * previous version or to be delivered in addition to the previous versions.
   *
   * @default OVERWRITE_EXPORT
   */
  readonly exportVersioning?: ExportVersioning;
}

export interface DataExportStorageOptions {
  /**
   * The S3 bucket where your data export will be stored.
   *    Length Constraints: Maximum length of 256.
   *    Pattern: [A-Za-z0-9_\.\-]+
   *
   */
  readonly bucket: cdk.aws_s3.IBucket;

  /**
   * The prefix that AWS adds to the report name when AWS delivers the report. Your prefix can't include spaces.
   *    Length Constraints: Maximum length of 256.
   *    Pattern: [A-Za-z0-9_\.\-]*
   *
   * @default ""
   *
   */
  readonly s3Prefix?: string;
}

export interface Cur2ExportProps
  extends Cur2ExportOptions,
  Cur2ContentOptions,
  Cur2DeliveryOptions,
  DataExportStorageOptions {}
