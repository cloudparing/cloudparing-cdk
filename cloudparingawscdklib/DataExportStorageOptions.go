package cloudparingawscdklib

import (
	"github.com/aws/aws-cdk-go/awscdk/v2/awss3"
)

type DataExportStorageOptions struct {
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
}

