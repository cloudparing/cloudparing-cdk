import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ReportDefinitionDefaults, ReportDefinitionProps } from './types';

const curRegion = 'us-east-1'; // cur only available in us-east-1
export class ReportDefinition extends Construct {
  constructor(scope: Construct, id: string, props: ReportDefinitionProps) {
    super(scope, id);

    const s3Region = props.s3Bucket.urlForObject('/').replace('https://s3.', '').replace(/\..*/, '');
    console.log(`>>>>> s3Region: ${s3Region}`);
    // https://s3.us-west-1.amazonaws.com/onlybucket
    new cdk.aws_cur.CfnReportDefinition(this, `${id}-Resource`, {
      reportName: props.reportName,
      s3Bucket: props.s3Bucket.bucketName,
      s3Region: `${s3Region}`,
      compression:
        props.compression || `${ReportDefinitionDefaults.compression}`,
      format: props.format || `${ReportDefinitionDefaults.format}`,
      refreshClosedReports:
        props.refreshClosedReports ||
        ReportDefinitionDefaults.refreshClosedReports ||
        true,
      reportVersioning:
        props.reportVersioning ||
        `${ReportDefinitionDefaults.reportVersioning}`,
      s3Prefix: props.s3Prefix || `${ReportDefinitionDefaults.s3Prefix}`,
      timeUnit: props.timeUnit || `${ReportDefinitionDefaults.timeUnit}`,
      additionalArtifacts: props.additionalArtifacts,
      additionalSchemaElements: props.additionalSchemaElements,
      billingViewArn: props.billingViewArn,
    });

    // Add bucket policy https://docs.aws.amazon.com/cur/latest/userguide/cur-s3.html
    const policy = this.addBucketPolicy(props.s3Bucket);
    if (policy) {
      this.node.addDependency(policy);
    }
  }

  private addBucketPolicy(
    bucket: cdk.aws_s3.IBucket,
  ): cdk.aws_s3.BucketPolicy | undefined {
    bucket.addToResourcePolicy(
      new cdk.aws_iam.PolicyStatement({
        effect: cdk.aws_iam.Effect.ALLOW,
        actions: ['s3:GetBucketAcl', 's3:GetBucketPolicy'],
        principals: [
          new cdk.aws_iam.ServicePrincipal('billingreports.amazonaws.com'),
        ],
        resources: [bucket.bucketArn],
        conditions: {
          StringEquals: {
            'aws:SourceArn': `arn:${cdk.Aws.PARTITION}:cur:${curRegion}:${cdk.Aws.ACCOUNT_ID}:definition/*`,
            'aws:SourceAccount': `${cdk.Aws.ACCOUNT_ID}`,
          },
        },
      }),
    );
    bucket.addToResourcePolicy(
      new cdk.aws_iam.PolicyStatement({
        effect: cdk.aws_iam.Effect.ALLOW,
        actions: ['s3:PutObject'],
        principals: [
          new cdk.aws_iam.ServicePrincipal('billingreports.amazonaws.com'),
        ],
        resources: [bucket.arnForObjects('*')],
        conditions: {
          StringEquals: {
            'aws:SourceArn': `arn:${cdk.Aws.PARTITION}:cur:${curRegion}:${cdk.Aws.ACCOUNT_ID}:definition/*`,
            'aws:SourceAccount': `${cdk.Aws.ACCOUNT_ID}`,
          },
        },
      }),
    );

    return bucket.policy;
  }
}
