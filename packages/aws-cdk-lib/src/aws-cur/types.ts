import * as cdk from 'aws-cdk-lib';

export type AdditionalArtifacts = 'REDSHIFT' | 'QUICKSIGHT' | 'ATHENA';
export type AdditionalSchemaElements =
  | 'RESOURCES'
  | 'SPLIT_COST_ALLOCATION_DATA';
export type Compression = 'ZIP' | 'GZIP' | 'Parquet';
export type Format = 'textORcsv' | 'Parquet';
export type ReportVersioning = 'CREATE_NEW_REPORT' | 'OVERWRITE_REPORT';
export type S3Region =
  | 'af-south-1'
  | 'ap-east-1'
  | 'ap-south-1'
  | 'ap-south-2'
  | 'ap-southeast-1'
  | 'ap-southeast-2'
  | 'ap-southeast-3'
  | 'ap-northeast-1'
  | 'ap-northeast-2'
  | 'ap-northeast-3'
  | 'ca-central-1'
  | 'eu-central-1'
  | 'eu-central-2'
  | 'eu-west-1'
  | 'eu-west-2'
  | 'eu-west-3'
  | 'eu-north-1'
  | 'eu-south-1'
  | 'eu-south-2'
  | 'me-central-1'
  | 'me-south-1'
  | 'sa-east-1'
  | 'us-east-1'
  | 'us-east-2'
  | 'us-west-1'
  | 'us-west-2'
  | 'cn-north-1'
  | 'cn-northwest-1'
  | string;
export type TimeUnit = 'HOURLY' | 'DAILY' | 'MONTHLY';

export interface ReportDefinitionOptions {
  /**
   * The compression format that Amazon Web Services uses for the report.
   *
   * @default GZIP
   *
   */
  readonly compression?: Compression;

  /**
   * The format that AWS saves the report in.
   *
   * @default textORcsv
   *
   */
  readonly format?: Format;

  /**
   * Whether you want AWS to update your reports after they have been finalized if AWS
   * detects charges related to previous months. These charges can include refunds,
   * credits, or support fees.
   *
   * @default true
   */
  readonly refreshClosedReports?: boolean | cdk.IResolvable;

  /**
   * Whether you want AWS to overwrite the previous version of each report or
   * to deliver the report in addition to the previous versions.
   *
   * @default OVERWRITE_REPORT
   */
  readonly reportVersioning?: ReportVersioning;

  /**
   * The prefix that AWS adds to the report name when AWS delivers the report. Your prefix can't include spaces.
   *    Length Constraints: Maximum length of 256.
   *    Pattern: [A-Za-z0-9_\.\-]*
   *
   * @default ""
   *
   */
  readonly s3Prefix?: string;

  /**
   * The length of time covered by the report.
   *
   * @default DAILY
   *
   */
  readonly timeUnit?: TimeUnit;

  /**
   * A list of manifests that you want Amazon Web Services to create for this report.
   *
   * @default - no additional artifacts
   */
  readonly additionalArtifacts?: AdditionalArtifacts[];

  /**
   * A list of strings that indicate additional content that Amazon Web Services includes in
   * the report, such as individual resource IDs.
   *
   * @default - no additional schema elements
   */
  readonly additionalSchemaElements?: string[];

  /**
   * The Amazon Resource Name (ARN) of the billing view.
   *
   * @default - no billing view ARN
   */
  readonly billingViewArn?: string;
}

export interface ReportDefinitionProps extends ReportDefinitionOptions {
  /**
   * The name of the report that you want to create.
   * The name must be unique, is case sensitive, and can't include spaces.
   *
   */
  readonly reportName: string;

  /**
   * The S3 bucket where AWS delivers the report.
   *    Length Constraints: Maximum length of 256.
   *    Pattern: [A-Za-z0-9_\.\-]+
   *
   */
  readonly s3Bucket: cdk.aws_s3.IBucket;
}

export const ReportDefinitionDefaults : ReportDefinitionOptions = {
  compression: 'GZIP',
  format: 'textORcsv',
  refreshClosedReports: true,
  reportVersioning: 'OVERWRITE_REPORT',
  timeUnit: 'DAILY',
  s3Prefix: '/',
};
