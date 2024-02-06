import { LernaTypescriptProject } from 'lerna-projen';
import {
  ApprovalLevel,
  AwsCdkConstructLibrary,
  AwsCdkTypeScriptApp,
  LambdaRuntime,
} from 'projen/lib/awscdk';
import { DependabotScheduleInterval } from 'projen/lib/github';
import { NpmAccess } from 'projen/lib/javascript';

const CDK_VERSION = '2.112.0';
const CONSTRUCTS_VERSION = '10.3.0';

const root = new LernaTypescriptProject({
  defaultReleaseBranch: 'main',
  devDeps: ['lerna-projen', 'constructs@^10.3.0', 'esbuild'],
  peerDeps: ['jsii-rosetta@~5.1.2'],
  name: 'cloudparing-cdk',
  projenrcTs: true,
  sampleCode: false,
  useWorkspaces: true,
  license: 'Apache-2.0',
  dependabot: true,
  dependabotOptions: {
    labels: ['auto-approve'],
    ignoreProjen: true,
    scheduleInterval: DependabotScheduleInterval.WEEKLY,
  },
  allowLibraryDependencies: true,
  minNodeVersion: '18.16.0',
});

new AwsCdkConstructLibrary({
  name: '@cloudparing/aws-cdk-lib',
  repositoryUrl: 'github.com/cloudparing/cloudparing-cdk',
  author: 'ayvazj',
  authorName: 'James Ayvaz',
  authorAddress: 'james@cloudparing.net',

  description: 'The cloudparing CDK library',
  license: 'Apache-2.0',

  defaultReleaseBranch: 'main',

  npmAccess: NpmAccess.PUBLIC,

  cdkVersion: CDK_VERSION,
  cdkVersionPinning: false,
  constructsVersion: CONSTRUCTS_VERSION,

  docgen: true,
  eslint: true,

  githubOptions: {
    mergify: true,
  },

  dependabot: true,
  dependabotOptions: {
    ignoreProjen: true,
    scheduleInterval: DependabotScheduleInterval.WEEKLY,
  },

  release: true,
  releaseToNpm: true,
  publishToPypi: {
    distName: 'cloudparing.aws-cdk',
    module: 'cloudparing.aws_cdk',
  },
  publishToNuget: {
    dotNetNamespace: 'Cloudparing.AwsCdk',
    packageId: 'Cloudparing.AwsCdk',
  },
  publishToGo: {
    moduleName: 'github.com/cloudparing/cloudparing-cdk/go/awscdk',
  },
  parent: root,
  outdir: 'packages/aws-cdk-lib',
  keywords: ['aws', 'cdk', 'cur', 'cost'],
  jsiiVersion: '~5.2.0',

  jestOptions: {
    jestVersion: '^29',
  },

  devDeps: ['@types/aws-lambda'],
  bundledDeps: [
    '@aws-sdk/client-bcm-data-exports',
    '@aws-sdk/client-s3',
    'aws-lambda',
  ],
  lambdaOptions: {
    runtime: LambdaRuntime.NODEJS_18_X,
    bundlingOptions: {
      externals: ['aws-sdk'],
      sourcemap: true,
    },
  },
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
  constructsVersion: CONSTRUCTS_VERSION,
  jestOptions: {
    jestVersion: '^29',
  },
  requireApproval: ApprovalLevel.NEVER,
});

cdkApp.addFields({ private: true });
cdkApp.addTask('bootstrap', {
  exec: 'cdk bootstrap',
});

// resolved @types/babel__traverse/index.d.ts:321:9 - error TS1110: Type expected
root.package.addPackageResolutions('@types/babel__traverse@7.18.2');

root.addFields({
  private: true,
  workspaces: ['packages/aws-cdk-lib', 'packages/aws-cdk-app'],
});
root.addTask('cdk', {
  exec: 'npx lerna --scope=@cloudparing/aws-cdk-app run -- ',
  receiveArgs: true,
});
root.addDevDeps('lerna@^7');
root.synth();
