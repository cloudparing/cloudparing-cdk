import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Cur2ExportDefinition } from './data-export-definition';
import {
  Cur2ContentOptions,
  Cur2DeliveryOptions,
  Cur2ExportProps,
} from './data-export-definition.types';
import { ReportDefinition } from './report-definition';
import { ReportDefinitionOptions } from './report-definition.types';

export interface CurStackProps extends cdk.StackProps, ReportDefinitionOptions {
  /**
   * The name of the report that you want to create.
   * The name must be unique, is case sensitive, and can't include spaces.
   *
   */
  readonly reportName: string;

  /**
   * The S3 bucket where AWS delivers the report - defaults to a new bucket named `cur-${ACCOUNT_ID}-${REGION}`
   *    Length Constraints: Maximum length of 256.
   *    Pattern: [A-Za-z0-9_\.\-]+
   *
   */
  readonly s3Bucket?: cdk.aws_s3.IBucket;
}

export class CurStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: CurStackProps) {
    super(scope, id, props);

    const curBucket =
      props.s3Bucket ||
      new cdk.aws_s3.Bucket(this, `${id}-CurBucket`, {
        bucketName: `cur-${cdk.Aws.ACCOUNT_ID}-${cdk.Aws.REGION}`,
      });

    new ReportDefinition(this, `${id}-ReportDefinition`, {
      ...(props as ReportDefinitionOptions),
      reportName: props.reportName,
      s3Bucket: curBucket,
    });
  }
}
export interface Cur2StackProps
  extends cdk.StackProps,
  Cur2ContentOptions,
  Cur2DeliveryOptions {
  /**
   * The name of this specific data export.
   */
  readonly name: string | undefined;

  /**
   * The description for this specific data export.
   */
  readonly exportDescription?: string;

  /**
   * The S3 bucket where your data export will be stored.
   *    Length Constraints: Maximum length of 256.
   *    Pattern: [A-Za-z0-9_\.\-]+
   *
   */
  readonly bucket?: cdk.aws_s3.IBucket;

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

export class Cur2Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: Cur2StackProps) {
    super(scope, id, props);

    const curBucket =
      props.bucket ||
      new cdk.aws_s3.Bucket(this, `${id}-Cur2Bucket`, {
        bucketName: `cur22-${cdk.Aws.ACCOUNT_ID}-${cdk.Aws.REGION}`,
      });

    new Cur2ExportDefinition(this, `${id}-Cur2ExportDefinition`, {
      ...(props as Cur2ExportProps),
      description: props.exportDescription,
      bucket: curBucket,
    });
  }
}
