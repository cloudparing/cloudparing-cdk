import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ReportDefinition } from './report-definition';
import { ReportDefinitionOptions } from './types';

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

    const curBucket = props.s3Bucket || new cdk.aws_s3.Bucket(this, `${id}-CurBucket`, {
      bucketName: `cur-${cdk.Aws.ACCOUNT_ID}-${cdk.Aws.REGION}`,
    });

    new ReportDefinition(this, `${id}-ReportDefinition`, {
      ...props as ReportDefinitionOptions,
      reportName: props.reportName,
      s3Bucket: curBucket,
    });
  }
}
