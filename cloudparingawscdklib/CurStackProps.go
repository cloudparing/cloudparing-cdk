package cloudparingawscdklib

import (
	"github.com/aws/aws-cdk-go/awscdk/v2"
	"github.com/aws/aws-cdk-go/awscdk/v2/awss3"
)

type CurStackProps struct {
	// Include runtime versioning information in this Stack.
	// Default: `analyticsReporting` setting of containing `App`, or value of
	// 'aws:cdk:version-reporting' context key.
	//
	AnalyticsReporting *bool `field:"optional" json:"analyticsReporting" yaml:"analyticsReporting"`
	// A description of the stack.
	// Default: - No description.
	//
	Description *string `field:"optional" json:"description" yaml:"description"`
	// The AWS environment (account/region) where this stack will be deployed.
	//
	// Set the `region`/`account` fields of `env` to either a concrete value to
	// select the indicated environment (recommended for production stacks), or to
	// the values of environment variables
	// `CDK_DEFAULT_REGION`/`CDK_DEFAULT_ACCOUNT` to let the target environment
	// depend on the AWS credentials/configuration that the CDK CLI is executed
	// under (recommended for development stacks).
	//
	// If the `Stack` is instantiated inside a `Stage`, any undefined
	// `region`/`account` fields from `env` will default to the same field on the
	// encompassing `Stage`, if configured there.
	//
	// If either `region` or `account` are not set nor inherited from `Stage`, the
	// Stack will be considered "*environment-agnostic*"". Environment-agnostic
	// stacks can be deployed to any environment but may not be able to take
	// advantage of all features of the CDK. For example, they will not be able to
	// use environmental context lookups such as `ec2.Vpc.fromLookup` and will not
	// automatically translate Service Principals to the right format based on the
	// environment's AWS partition, and other such enhancements.
	//
	// Example:
	//   // Use a concrete account and region to deploy this stack to:
	//   // `.account` and `.region` will simply return these values.
	//   new Stack(app, 'Stack1', {
	//     env: {
	//       account: '123456789012',
	//       region: 'us-east-1'
	//     },
	//   });
	//
	//   // Use the CLI's current credentials to determine the target environment:
	//   // `.account` and `.region` will reflect the account+region the CLI
	//   // is configured to use (based on the user CLI credentials)
	//   new Stack(app, 'Stack2', {
	//     env: {
	//       account: process.env.CDK_DEFAULT_ACCOUNT,
	//       region: process.env.CDK_DEFAULT_REGION
	//     },
	//   });
	//
	//   // Define multiple stacks stage associated with an environment
	//   const myStage = new Stage(app, 'MyStage', {
	//     env: {
	//       account: '123456789012',
	//       region: 'us-east-1'
	//     }
	//   });
	//
	//   // both of these stacks will use the stage's account/region:
	//   // `.account` and `.region` will resolve to the concrete values as above
	//   new MyStack(myStage, 'Stack1');
	//   new YourStack(myStage, 'Stack2');
	//
	//   // Define an environment-agnostic stack:
	//   // `.account` and `.region` will resolve to `{ "Ref": "AWS::AccountId" }` and `{ "Ref": "AWS::Region" }` respectively.
	//   // which will only resolve to actual values by CloudFormation during deployment.
	//   new MyStack(app, 'Stack1');
	//
	// Default: - The environment of the containing `Stage` if available,
	// otherwise create the stack will be environment-agnostic.
	//
	Env *awscdk.Environment `field:"optional" json:"env" yaml:"env"`
	// Name to deploy the stack with.
	// Default: - Derived from construct path.
	//
	StackName *string `field:"optional" json:"stackName" yaml:"stackName"`
	// Synthesis method to use while deploying this stack.
	// Default: - `DefaultStackSynthesizer` if the `@aws-cdk/core:newStyleStackSynthesis` feature flag
	// is set, `LegacyStackSynthesizer` otherwise.
	//
	Synthesizer awscdk.IStackSynthesizer `field:"optional" json:"synthesizer" yaml:"synthesizer"`
	// Stack tags that will be applied to all the taggable resources and the stack itself.
	// Default: {}.
	//
	Tags *map[string]*string `field:"optional" json:"tags" yaml:"tags"`
	// Whether to enable termination protection for this stack.
	// Default: false.
	//
	TerminationProtection *bool `field:"optional" json:"terminationProtection" yaml:"terminationProtection"`
	// A list of manifests that you want Amazon Web Services to create for this report.
	// Default: - no additional artifacts.
	//
	AdditionalArtifacts *[]*string `field:"optional" json:"additionalArtifacts" yaml:"additionalArtifacts"`
	// A list of strings that indicate additional content that Amazon Web Services includes in the report, such as individual resource IDs.
	// Default: - no additional schema elements.
	//
	AdditionalSchemaElements *[]*string `field:"optional" json:"additionalSchemaElements" yaml:"additionalSchemaElements"`
	// The Amazon Resource Name (ARN) of the billing view.
	// Default: - no billing view ARN.
	//
	BillingViewArn *string `field:"optional" json:"billingViewArn" yaml:"billingViewArn"`
	// The compression format that Amazon Web Services uses for the report.
	// Default: GZIP.
	//
	Compression *string `field:"optional" json:"compression" yaml:"compression"`
	// The format that AWS saves the report in.
	// Default: textORcsv.
	//
	Format *string `field:"optional" json:"format" yaml:"format"`
	// Whether you want AWS to update your reports after they have been finalized if AWS detects charges related to previous months.
	//
	// These charges can include refunds,
	// credits, or support fees.
	// Default: true.
	//
	RefreshClosedReports interface{} `field:"optional" json:"refreshClosedReports" yaml:"refreshClosedReports"`
	// Whether you want AWS to overwrite the previous version of each report or to deliver the report in addition to the previous versions.
	// Default: OVERWRITE_REPORT.
	//
	ReportVersioning *string `field:"optional" json:"reportVersioning" yaml:"reportVersioning"`
	// The prefix that AWS adds to the report name when AWS delivers the report.
	//
	// Your prefix can't include spaces.
	//    Length Constraints: Maximum length of 256.
	//    Pattern: [A-Za-z0-9_\.\-]*
	// Default: "".
	//
	S3Prefix *string `field:"optional" json:"s3Prefix" yaml:"s3Prefix"`
	// The length of time covered by the report.
	// Default: DAILY.
	//
	TimeUnit *string `field:"optional" json:"timeUnit" yaml:"timeUnit"`
	// The name of the report that you want to create.
	//
	// The name must be unique, is case sensitive, and can't include spaces.
	ReportName *string `field:"required" json:"reportName" yaml:"reportName"`
	// The S3 bucket where AWS delivers the report - defaults to a new bucket named `cur-${ACCOUNT_ID}-${REGION}`    Length Constraints: Maximum length of 256.
	//
	// Pattern: [A-Za-z0-9_\.\-]+
	S3Bucket awss3.IBucket `field:"optional" json:"s3Bucket" yaml:"s3Bucket"`
}
