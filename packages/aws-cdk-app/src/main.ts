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
