import { Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Bucket } from 'aws-cdk-lib/aws-s3';

import { ReportDefinition } from '../../lib/aws-cur';

test('snapshot: cur report defaults', () => {
  const stack = new Stack();

  const curBucket = new Bucket(stack, 'CurBucketId', {
    bucketName: 'cur-bucket-name',
  });
  new ReportDefinition(stack, 'ReportDefinitionId', {
    reportName: 'ReportDefinitionName',
    s3Bucket: curBucket,
    s3Prefix: 'ReportDefinitionPrefix',
  });

  expect(Template.fromStack(stack)).toMatchSnapshot();
});


test('snapshot: cur report spec\'d out', () => {
  const stack = new Stack();

  const curBucket = new Bucket(stack, 'CurBucketId', {
    bucketName: 'cur-bucket-name',
  });
  new ReportDefinition(stack, 'ReportDefinitionId', {
    reportName: 'ReportDefinitionName',
    s3Bucket: curBucket,
    s3Prefix: 'ReportDefinitionPrefix',
    timeUnit: 'MONTHLY',
    additionalArtifacts: ['REDSHIFT'],
    additionalSchemaElements: ['ReportDefinitionAdditionalSchemaElements'],
    billingViewArn: 'ReportDefinitionBillingViewArn',
    format: 'Parquet',
    refreshClosedReports: false,
    reportVersioning: 'CREATE_NEW_REPORT',
    compression: 'ZIP',
  });

  expect(Template.fromStack(stack)).toMatchSnapshot();
});

