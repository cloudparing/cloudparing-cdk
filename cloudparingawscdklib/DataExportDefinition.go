package cloudparingawscdklib

import (
	_jsii_ "github.com/aws/jsii-runtime-go/runtime"
	_init_ "github.com/cloudparing/cloudparing-cdk/go/awscdk/cloudparingawscdklib/jsii"

	"github.com/aws/constructs-go/constructs/v10"
	"github.com/cloudparing/cloudparing-cdk/go/awscdk/cloudparingawscdklib/internal"
)

type DataExportDefinition interface {
	constructs.Construct
	// The tree node.
	Node() constructs.Node
	// Returns a string representation of this construct.
	ToString() *string
}

// The jsii proxy struct for DataExportDefinition
type jsiiProxy_DataExportDefinition struct {
	internal.Type__constructsConstruct
}

func (j *jsiiProxy_DataExportDefinition) Node() constructs.Node {
	var returns constructs.Node
	_jsii_.Get(
		j,
		"node",
		&returns,
	)
	return returns
}


func NewDataExportDefinition(scope constructs.Construct, id *string, props *DataExportDefinitionProps) DataExportDefinition {
	_init_.Initialize()

	if err := validateNewDataExportDefinitionParameters(scope, id, props); err != nil {
		panic(err)
	}
	j := jsiiProxy_DataExportDefinition{}

	_jsii_.Create(
		"@cloudparing/aws-cdk-lib.DataExportDefinition",
		[]interface{}{scope, id, props},
		&j,
	)

	return &j
}

func NewDataExportDefinition_Override(d DataExportDefinition, scope constructs.Construct, id *string, props *DataExportDefinitionProps) {
	_init_.Initialize()

	_jsii_.Create(
		"@cloudparing/aws-cdk-lib.DataExportDefinition",
		[]interface{}{scope, id, props},
		d,
	)
}

// Checks if `x` is a construct.
//
// Use this method instead of `instanceof` to properly detect `Construct`
// instances, even when the construct library is symlinked.
//
// Explanation: in JavaScript, multiple copies of the `constructs` library on
// disk are seen as independent, completely different libraries. As a
// consequence, the class `Construct` in each copy of the `constructs` library
// is seen as a different class, and an instance of one class will not test as
// `instanceof` the other class. `npm install` will not create installations
// like this, but users may manually symlink construct libraries together or
// use a monorepo tool: in those cases, multiple copies of the `constructs`
// library can be accidentally installed, and `instanceof` will behave
// unpredictably. It is safest to avoid using `instanceof`, and using
// this type-testing method instead.
//
// Returns: true if `x` is an object created from a class which extends `Construct`.
func DataExportDefinition_IsConstruct(x interface{}) *bool {
	_init_.Initialize()

	if err := validateDataExportDefinition_IsConstructParameters(x); err != nil {
		panic(err)
	}
	var returns *bool

	_jsii_.StaticInvoke(
		"@cloudparing/aws-cdk-lib.DataExportDefinition",
		"isConstruct",
		[]interface{}{x},
		&returns,
	)

	return returns
}

func (d *jsiiProxy_DataExportDefinition) ToString() *string {
	var returns *string

	_jsii_.Invoke(
		d,
		"toString",
		nil, // no parameters
		&returns,
	)

	return returns
}

