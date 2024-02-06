import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Cur2Stack } from '../../lib';

test('snapshot: CurStack', () => {
  const app = new App();
  const stack = new Cur2Stack(app, 'test', {
    env: {
      account: '123456789012',
      region: 'us-east-1',
    },
    name: 'ReportDefinitionName',
    description: 'Description of export',
    timeUnit: 'DAILY',
  });

  const template = Template.fromStack(stack);
  expect(template.toJSON()).toMatchSnapshot();
});

test('snapshot: CurStack includeResourceIds', () => {
  const app = new App();
  const stack = new Cur2Stack(app, 'test', {
    env: {
      account: '123456789012',
      region: 'us-east-1',
    },
    name: 'ReportDefinitionName',
    description: 'Description of export',
    timeUnit: 'DAILY',
    includeResourceIds: true,
  });

  const template = Template.fromStack(stack);
  expect(template.toJSON()).toMatchSnapshot();
});

test('snapshot: CurStack splitCostAllocationData', () => {
  const app = new App();
  const stack = new Cur2Stack(app, 'test', {
    env: {
      account: '123456789012',
      region: 'us-east-1',
    },
    name: 'ReportDefinitionName',
    description: 'Description of export',
    timeUnit: 'DAILY',
    splitCostAllocationData: true,
  });

  const template = Template.fromStack(stack);
  expect(template.toJSON()).toMatchSnapshot();
});
