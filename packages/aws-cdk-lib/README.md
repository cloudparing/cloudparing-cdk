# Cloudparing AWS CDK Construct Library

CDK constructs focused on monitoring and reducing cloud infrastructure costs.

## Installation

<details><summary><strong>TypeScript</strong></summary>

> https://www.npmjs.com/package/@cloudparing/aws-cdk-lib

In your `package.json`:

```json
{
  "dependencies": {
    "@cloudparing/aws-cdk-lib": "^0.0.0",

    // peer dependencies
    "aws-cdk-lib": "^2.65.0",
    "constructs": "^10.0.5"

    // ...your other dependencies...
  }
}
```
</details>

## Features

### Cost and Usage Report (CUR) v2 Report

```ts

    const curBucket =
      props.bucket ||
      new cdk.aws_s3.Bucket(this, `Cur2Bucket`, {
        bucketName: `cur2-${cdk.Aws.ACCOUNT_ID}-${cdk.Aws.REGION}`,
      });

    new Cur2ExportDefinition(this, `Cur2ExportDefinition`, {
      name: 'cur2-daily-csv',
      description: props.exportDescription,
      bucket: curBucket,
    });

```

### Legacy Cost and Usage Report (CUR)

An L2 construct and CDK stack for configuring the AWS Cost and Usage Report.

**NOTE: The CUR report must be deployed to us-east-1**

**Example using the ReportDefinition construct:**
```
    new ReportDefinition(this, `ReportDefinitionId`, {
      reportName: "CUR Report",
      s3Bucket: yourS3Bucket,
    });
```

**Example using the provided Stacks:**
```
import { CurStack, Cur2Stack } from '@cloudparing/aws-cdk-lib';
import * as cdk from 'aws-cdk-lib';

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new cdk.App();

new CurStack(app, 'curStack-dev', {
  env: devEnv,
  stackName: 'CurStack',
  reportName: 'cur-daily-csv',
});

new Cur2Stack(app, 'cur2Stack-dev', {
  env: devEnv,
  stackName: 'Cur2Stack',
  name: 'cur2-daily-csv',
});

app.synth();

```

Both the L2 construct and the stack provide sensible defaults which can be customized by setting props.

```
    new ReportDefinition(this, `ReportDefinitionId`, {
      reportName: "CUR Report",
      s3Bucket: yourS3Bucket,
      format: 'Parquet'
    });
```


## License

This project is licensed under the Apache-2.0 License.