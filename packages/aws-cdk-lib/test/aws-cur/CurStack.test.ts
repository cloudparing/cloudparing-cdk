import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { CurStack } from '../../lib';

test('snapshot: CurStack', () => {
  const app = new App();
  const stack = new CurStack(app, 'test', {
    env: {
      account: '123456789012',
      region: 'us-east-1',
    },
    reportName: 'ReportDefinitionName',
  });

  const template = Template.fromStack(stack);
  expect(template.toJSON()).toMatchSnapshot();
});
