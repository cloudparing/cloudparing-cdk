package cloudparingawscdklib

import (
	"github.com/aws/aws-cdk-go/awscdk/v2/awss3"
)

type DataExportDefinitionProps struct {
	// The description for this specific data export.
	Description *string `field:"optional" json:"description" yaml:"description"`
	// The name of this specific data export.
	Name *string `field:"optional" json:"name" yaml:"name"`
	// The S3 bucket where your data export will be stored.
	//
	// Length Constraints: Maximum length of 256.
	//    Pattern: [A-Za-z0-9_\.\-]+
	Bucket awss3.IBucket `field:"required" json:"bucket" yaml:"bucket"`
	// The prefix that AWS adds to the report name when AWS delivers the report.
	//
	// Your prefix can't include spaces.
	//    Length Constraints: Maximum length of 256.
	//    Pattern: [A-Za-z0-9_\.\-]*
	// Default: "".
	//
	S3Prefix *string `field:"optional" json:"s3Prefix" yaml:"s3Prefix"`
	// Properties to pass to the Lambda.
	// Default: - No properties.
	//
	Properties *map[string]interface{} `field:"optional" json:"properties" yaml:"properties"`
}

