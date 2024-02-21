package cloudparingawscdklib


type Cur2DeliveryOptions struct {
	// The compression type and file format for your export.
	// Default: GZIP_CSV.
	//
	CompressionFormat *string `field:"optional" json:"compressionFormat" yaml:"compressionFormat"`
	// Whether you want each version of the data export file to overwrite the previous version or to be delivered in addition to the previous versions.
	// Default: OVERWRITE_EXPORT.
	//
	ExportVersioning *string `field:"optional" json:"exportVersioning" yaml:"exportVersioning"`
}

