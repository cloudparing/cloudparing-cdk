package cloudparingawscdklib

import (
	"github.com/aws/aws-cdk-go/awscdk/v2/awss3"
)

type Cur2ExportProps struct {
	// The description for this specific data export.
	Description *string `field:"optional" json:"description" yaml:"description"`
	// The name of this specific data export.
	Name *string `field:"optional" json:"name" yaml:"name"`
	// The columns that you want to include in your data query.
	//
	// This allows
	// you to create exports with consistent schemas, remove sensitive cost data,
	// and reduce the file size of the export. By default, all columns are selected
	// Default: false.
	//
	Columns *[]*string `field:"optional" json:"columns" yaml:"columns"`
	// Include a column containing the unique AWS resource ID for applicable line items.
	//
	// Including individual resource IDs in your export might
	// increase the file size.
	// Default: false.
	//
	IncludeResourceIds *bool `field:"optional" json:"includeResourceIds" yaml:"includeResourceIds"`
	// Include detailed cost and usage for shared resources for cost allocation (only available for Amazon ECS).
	//
	// Including these resources introduces new
	// rows and columns in the Cost and Usage Report and might increase the file size.
	// Default: false.
	//
	SplitCostAllocationData *bool `field:"optional" json:"splitCostAllocationData" yaml:"splitCostAllocationData"`
	// The time granularity for how you want the line items in the export to be aggregated.
	// Default: HOURLY.
	//
	TimeUnit *string `field:"optional" json:"timeUnit" yaml:"timeUnit"`
	// The compression type and file format for your export.
	// Default: GZIP_CSV.
	//
	CompressionFormat *string `field:"optional" json:"compressionFormat" yaml:"compressionFormat"`
	// Whether you want each version of the data export file to overwrite the previous version or to be delivered in addition to the previous versions.
	// Default: OVERWRITE_EXPORT.
	//
	ExportVersioning *string `field:"optional" json:"exportVersioning" yaml:"exportVersioning"`
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

