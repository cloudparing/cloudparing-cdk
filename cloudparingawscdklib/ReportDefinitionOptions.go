package cloudparingawscdklib


type ReportDefinitionOptions struct {
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
}

