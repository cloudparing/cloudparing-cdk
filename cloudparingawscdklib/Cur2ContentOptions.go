package cloudparingawscdklib


type Cur2ContentOptions struct {
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
}

