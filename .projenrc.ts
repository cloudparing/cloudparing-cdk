import { LernaTypescriptProject } from 'lerna-projen';
import { AwsCdkConstructLibrary, AwsCdkTypeScriptApp } from 'projen/lib/awscdk';

const CDK_VERSION = '2.1.0';

const root = new LernaTypescriptProject({
  defaultReleaseBranch: 'main',
  devDeps: ['lerna-projen', 'constructs@^10.0.5'],
  peerDeps: ['jsii-rosetta@~5.1.2'],
  name: 'cloudparing-cdk',
  projenrcTs: true,
  sampleCode: false,
  useWorkspaces: true,
  license: 'Apache-2.0',
});

new AwsCdkConstructLibrary({
  authorAddress: 'james@cloudparing.net',
  author: 'James Ayvaz',
  description: 'The cloudparing CDK library',
  name: '@cloudparing/aws-cdk-lib',
  license: 'Apache-2.0',
  repositoryUrl: 'github.com/cloudparing/cloudparing-cdk',
  defaultReleaseBranch: 'main',
  cdkVersion: CDK_VERSION,
  parent: root,
  outdir: 'packages/aws-cdk-lib',
  keywords: ['aws', 'cdk', 'cur', 'cost'],
  jsiiVersion: '~5.0.0',
  constructsVersion: '10.2.61',
});

const cdkApp = new AwsCdkTypeScriptApp({
  description: 'The cloudparing CDK app',
  name: '@cloudparing/aws-cdk-app',
  copyrightOwner: 'cloudparing',
  license: 'Apache-2.0',
  defaultReleaseBranch: 'main',
  cdkVersion: CDK_VERSION,
  parent: root,
  outdir: 'packages/aws-cdk-app',
  keywords: ['aws', 'cdk'],
  deps: ['@cloudparing/aws-cdk-lib'],
  cdkVersionPinning: true,
  constructsVersion: '10.2.61',
});

cdkApp.addFields({ private: true });

// resolved @types/babel__traverse/index.d.ts:321:9 - error TS1110: Type expected
root.package.addPackageResolutions('@types/babel__traverse@7.18.2');

root.addFields({ private: true, workspaces: root.subprojects.map((p) => p.outdir.replace('/Users/pwner/Src/cloudparing/cloudparing-cdk/', '')) });
root.addDevDeps('lerna@^7');
root.synth();