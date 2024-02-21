package cloudparingawscdklib

import (
	_jsii_ "github.com/aws/jsii-runtime-go/runtime"
	_init_ "github.com/cloudparing/cloudparing-cdk/go/awscdk/cloudparingawscdklib/jsii"

	"github.com/aws/constructs-go/constructs/v10"
)

type Cur2ExportDefinition interface {
	DataExportDefinition
	// The tree node.
	Node() constructs.Node
	// Returns a string representation of this construct.
	ToString() *string
}

// The jsii proxy struct for Cur2ExportDefinition
type jsiiProxy_Cur2ExportDefinition struct {
	jsiiProxy_DataExportDefinition
}

func (j *jsiiProxy_Cur2ExportDefinition) Node() constructs.Node {
	var returns constructs.Node
	_jsii_.Get(
		j,
		"node",
		&returns,
	)
	return returns
}


func NewCur2ExportDefinition(scope constructs.Construct, id *string, props *Cur2ExportProps) Cur2ExportDefinition {
	_init_.Initialize()

	if err := validateNewCur2ExportDefinitionParameters(scope, id, props); err != nil {
		panic(err)
	}
	j := jsiiProxy_Cur2ExportDefinition{}

	_jsii_.Create(
		"@cloudparing/aws-cdk-lib.Cur2ExportDefinition",
		[]interface{}{scope, id, props},
		&j,
	)

	return &j
}

func NewCur2ExportDefinition_Override(c Cur2ExportDefinition, scope constructs.Construct, id *string, props *Cur2ExportProps) {
	_init_.Initialize()

	_jsii_.Create(
		"@cloudparing/aws-cdk-lib.Cur2ExportDefinition",
		[]interface{}{scope, id, props},
		c,
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
func Cur2ExportDefinition_IsConstruct(x interface{}) *bool {
	_init_.Initialize()

	if err := validateCur2ExportDefinition_IsConstructParameters(x); err != nil {
		panic(err)
	}
	var returns *bool

	_jsii_.StaticInvoke(
		"@cloudparing/aws-cdk-lib.Cur2ExportDefinition",
		"isConstruct",
		[]interface{}{x},
		&returns,
	)

	return returns
}

func (c *jsiiProxy_Cur2ExportDefinition) ToString() *string {
	var returns *string

	_jsii_.Invoke(
		c,
		"toString",
		nil, // no parameters
		&returns,
	)

	return returns
}

