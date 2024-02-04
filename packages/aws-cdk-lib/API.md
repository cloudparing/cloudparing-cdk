# Cloudparing AWS CDK Construct Library

CDK constructs focused on monitoring and reducing cloud infrastructure costs.

## Installation

<details><summary><strong>TypeScript</strong></summary>

> https://www.npmjs.com/package/@cloudparing/aws-cdk-lib

In your `package.json`:

```json
{
  "dependencies": {
    "@cloudparing/aws-cdk-lib": "^0.0.0",

    // peer dependencies
    "aws-cdk-lib": "^2.65.0",
    "constructs": "^10.0.5"

    // ...your other dependencies...
  }
}
```
</details>

## Features

### Cost and Usage Report (CUR) v2 Report

```ts

    const curBucket =
      props.bucket ||
      new cdk.aws_s3.Bucket(this, `Cur2Bucket`, {
        bucketName: `cur2-${cdk.Aws.ACCOUNT_ID}-${cdk.Aws.REGION}`,
      });

    new Cur2ExportDefinition(this, `Cur2ExportDefinition`, {
      name: 'cur2-daily-csv',
      description: props.exportDescription,
      bucket: curBucket,
    });

```

### Legacy Cost and Usage Report (CUR)

An L2 construct and CDK stack for configuring the AWS Cost and Usage Report.

**NOTE: The CUR report must be deployed to us-east-1**

**Example using the ReportDefinition construct:**
```
    new ReportDefinition(this, `ReportDefinitionId`, {
      reportName: "CUR Report",
      s3Bucket: yourS3Bucket,
    });
```

**Example using the provided Stack:**
```
import { CurStack, Cur2Stack } from '@cloudparing/aws-cdk-lib';
import * as cdk from 'aws-cdk-lib';

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new cdk.App();

new CurStack(app, 'curStack-dev', {
  env: devEnv,
  stackName: 'CurStack',
  reportName: 'cur-daily-csv',
});

new Cur2Stack(app, 'cur2Stack-dev', {
  env: devEnv,
  stackName: 'Cur2Stack',
  name: 'cur2-daily-csv',
});

app.synth();

```

Both the L2 construct and the stack provide sensible defaults which can be customized by setting props.

```
    new ReportDefinition(this, `ReportDefinitionId`, {
      reportName: "CUR Report",
      s3Bucket: yourS3Bucket,
      format: 'Parquet'
    });
```


## License

This project is licensed under the Apache-2.0 License.
# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### Cur2ExportDefinition <a name="Cur2ExportDefinition" id="@cloudparing/aws-cdk-lib.Cur2ExportDefinition"></a>

#### Initializers <a name="Initializers" id="@cloudparing/aws-cdk-lib.Cur2ExportDefinition.Initializer"></a>

```typescript
import { Cur2ExportDefinition } from '@cloudparing/aws-cdk-lib'

new Cur2ExportDefinition(scope: Construct, id: string, props: Cur2ExportProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2ExportDefinition.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2ExportDefinition.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2ExportDefinition.Initializer.parameter.props">props</a></code> | <code><a href="#@cloudparing/aws-cdk-lib.Cur2ExportProps">Cur2ExportProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@cloudparing/aws-cdk-lib.Cur2ExportDefinition.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@cloudparing/aws-cdk-lib.Cur2ExportDefinition.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@cloudparing/aws-cdk-lib.Cur2ExportDefinition.Initializer.parameter.props"></a>

- *Type:* <a href="#@cloudparing/aws-cdk-lib.Cur2ExportProps">Cur2ExportProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2ExportDefinition.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@cloudparing/aws-cdk-lib.Cur2ExportDefinition.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2ExportDefinition.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="@cloudparing/aws-cdk-lib.Cur2ExportDefinition.isConstruct"></a>

```typescript
import { Cur2ExportDefinition } from '@cloudparing/aws-cdk-lib'

Cur2ExportDefinition.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@cloudparing/aws-cdk-lib.Cur2ExportDefinition.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2ExportDefinition.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@cloudparing/aws-cdk-lib.Cur2ExportDefinition.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


### Cur2Stack <a name="Cur2Stack" id="@cloudparing/aws-cdk-lib.Cur2Stack"></a>

#### Initializers <a name="Initializers" id="@cloudparing/aws-cdk-lib.Cur2Stack.Initializer"></a>

```typescript
import { Cur2Stack } from '@cloudparing/aws-cdk-lib'

new Cur2Stack(scope: Construct, id: string, props: Cur2StackProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2Stack.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2Stack.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2Stack.Initializer.parameter.props">props</a></code> | <code><a href="#@cloudparing/aws-cdk-lib.Cur2StackProps">Cur2StackProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@cloudparing/aws-cdk-lib.Cur2Stack.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@cloudparing/aws-cdk-lib.Cur2Stack.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@cloudparing/aws-cdk-lib.Cur2Stack.Initializer.parameter.props"></a>

- *Type:* <a href="#@cloudparing/aws-cdk-lib.Cur2StackProps">Cur2StackProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2Stack.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2Stack.addDependency">addDependency</a></code> | Add a dependency between this stack and another stack. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2Stack.addMetadata">addMetadata</a></code> | Adds an arbitary key-value pair, with information you want to record about the stack. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2Stack.addTransform">addTransform</a></code> | Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2Stack.exportStringListValue">exportStringListValue</a></code> | Create a CloudFormation Export for a string list value. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2Stack.exportValue">exportValue</a></code> | Create a CloudFormation Export for a string value. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2Stack.formatArn">formatArn</a></code> | Creates an ARN from components. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2Stack.getLogicalId">getLogicalId</a></code> | Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2Stack.regionalFact">regionalFact</a></code> | Look up a fact value for the given fact for the region of this stack. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2Stack.renameLogicalId">renameLogicalId</a></code> | Rename a generated logical identities. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2Stack.reportMissingContextKey">reportMissingContextKey</a></code> | Indicate that a context key was expected. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2Stack.resolve">resolve</a></code> | Resolve a tokenized value in the context of the current stack. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2Stack.splitArn">splitArn</a></code> | Splits the provided ARN into its components. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2Stack.toJsonString">toJsonString</a></code> | Convert an object, potentially containing tokens, to a JSON string. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2Stack.toYamlString">toYamlString</a></code> | Convert an object, potentially containing tokens, to a YAML string. |

---

##### `toString` <a name="toString" id="@cloudparing/aws-cdk-lib.Cur2Stack.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addDependency` <a name="addDependency" id="@cloudparing/aws-cdk-lib.Cur2Stack.addDependency"></a>

```typescript
public addDependency(target: Stack, reason?: string): void
```

Add a dependency between this stack and another stack.

This can be used to define dependencies between any two stacks within an
app, and also supports nested stacks.

###### `target`<sup>Required</sup> <a name="target" id="@cloudparing/aws-cdk-lib.Cur2Stack.addDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.Stack

---

###### `reason`<sup>Optional</sup> <a name="reason" id="@cloudparing/aws-cdk-lib.Cur2Stack.addDependency.parameter.reason"></a>

- *Type:* string

---

##### `addMetadata` <a name="addMetadata" id="@cloudparing/aws-cdk-lib.Cur2Stack.addMetadata"></a>

```typescript
public addMetadata(key: string, value: any): void
```

Adds an arbitary key-value pair, with information you want to record about the stack.

These get translated to the Metadata section of the generated template.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html)

###### `key`<sup>Required</sup> <a name="key" id="@cloudparing/aws-cdk-lib.Cur2Stack.addMetadata.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="@cloudparing/aws-cdk-lib.Cur2Stack.addMetadata.parameter.value"></a>

- *Type:* any

---

##### `addTransform` <a name="addTransform" id="@cloudparing/aws-cdk-lib.Cur2Stack.addTransform"></a>

```typescript
public addTransform(transform: string): void
```

Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template.

Duplicate values are removed when stack is synthesized.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html)

*Example*

```typescript
declare const stack: Stack;

stack.addTransform('AWS::Serverless-2016-10-31')
```


###### `transform`<sup>Required</sup> <a name="transform" id="@cloudparing/aws-cdk-lib.Cur2Stack.addTransform.parameter.transform"></a>

- *Type:* string

The transform to add.

---

##### `exportStringListValue` <a name="exportStringListValue" id="@cloudparing/aws-cdk-lib.Cur2Stack.exportStringListValue"></a>

```typescript
public exportStringListValue(exportedValue: any, options?: ExportValueOptions): string[]
```

Create a CloudFormation Export for a string list value.

Returns a string list representing the corresponding `Fn.importValue()`
expression for this Export. The export expression is automatically wrapped with an
`Fn::Join` and the import value with an `Fn::Split`, since CloudFormation can only
export strings. You can control the name for the export by passing the `name` option.

If you don't supply a value for `name`, the value you're exporting must be
a Resource attribute (for example: `bucket.bucketName`) and it will be
given the same name as the automatic cross-stack reference that would be created
if you used the attribute in another Stack.

One of the uses for this method is to *remove* the relationship between
two Stacks established by automatic cross-stack references. It will
temporarily ensure that the CloudFormation Export still exists while you
remove the reference from the consuming stack. After that, you can remove
the resource and the manual export.

See `exportValue` for an example of this process.

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="@cloudparing/aws-cdk-lib.Cur2Stack.exportStringListValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="@cloudparing/aws-cdk-lib.Cur2Stack.exportStringListValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `exportValue` <a name="exportValue" id="@cloudparing/aws-cdk-lib.Cur2Stack.exportValue"></a>

```typescript
public exportValue(exportedValue: any, options?: ExportValueOptions): string
```

Create a CloudFormation Export for a string value.

Returns a string representing the corresponding `Fn.importValue()`
expression for this Export. You can control the name for the export by
passing the `name` option.

If you don't supply a value for `name`, the value you're exporting must be
a Resource attribute (for example: `bucket.bucketName`) and it will be
given the same name as the automatic cross-stack reference that would be created
if you used the attribute in another Stack.

One of the uses for this method is to *remove* the relationship between
two Stacks established by automatic cross-stack references. It will
temporarily ensure that the CloudFormation Export still exists while you
remove the reference from the consuming stack. After that, you can remove
the resource and the manual export.

## Example

Here is how the process works. Let's say there are two stacks,
`producerStack` and `consumerStack`, and `producerStack` has a bucket
called `bucket`, which is referenced by `consumerStack` (perhaps because
an AWS Lambda Function writes into it, or something like that).

It is not safe to remove `producerStack.bucket` because as the bucket is being
deleted, `consumerStack` might still be using it.

Instead, the process takes two deployments:

### Deployment 1: break the relationship

- Make sure `consumerStack` no longer references `bucket.bucketName` (maybe the consumer
  stack now uses its own bucket, or it writes to an AWS DynamoDB table, or maybe you just
  remove the Lambda Function altogether).
- In the `ProducerStack` class, call `this.exportValue(this.bucket.bucketName)`. This
  will make sure the CloudFormation Export continues to exist while the relationship
  between the two stacks is being broken.
- Deploy (this will effectively only change the `consumerStack`, but it's safe to deploy both).

### Deployment 2: remove the bucket resource

- You are now free to remove the `bucket` resource from `producerStack`.
- Don't forget to remove the `exportValue()` call as well.
- Deploy again (this time only the `producerStack` will be changed -- the bucket will be deleted).

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="@cloudparing/aws-cdk-lib.Cur2Stack.exportValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="@cloudparing/aws-cdk-lib.Cur2Stack.exportValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `formatArn` <a name="formatArn" id="@cloudparing/aws-cdk-lib.Cur2Stack.formatArn"></a>

```typescript
public formatArn(components: ArnComponents): string
```

Creates an ARN from components.

If `partition`, `region` or `account` are not specified, the stack's
partition, region and account will be used.

If any component is the empty string, an empty string will be inserted
into the generated ARN at the location that component corresponds to.

The ARN will be formatted as follows:

  arn:{partition}:{service}:{region}:{account}:{resource}{sep}{resource-name}

The required ARN pieces that are omitted will be taken from the stack that
the 'scope' is attached to. If all ARN pieces are supplied, the supplied scope
can be 'undefined'.

###### `components`<sup>Required</sup> <a name="components" id="@cloudparing/aws-cdk-lib.Cur2Stack.formatArn.parameter.components"></a>

- *Type:* aws-cdk-lib.ArnComponents

---

##### `getLogicalId` <a name="getLogicalId" id="@cloudparing/aws-cdk-lib.Cur2Stack.getLogicalId"></a>

```typescript
public getLogicalId(element: CfnElement): string
```

Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource.

This method is called when a `CfnElement` is created and used to render the
initial logical identity of resources. Logical ID renames are applied at
this stage.

This method uses the protected method `allocateLogicalId` to render the
logical ID for an element. To modify the naming scheme, extend the `Stack`
class and override this method.

###### `element`<sup>Required</sup> <a name="element" id="@cloudparing/aws-cdk-lib.Cur2Stack.getLogicalId.parameter.element"></a>

- *Type:* aws-cdk-lib.CfnElement

The CloudFormation element for which a logical identity is needed.

---

##### `regionalFact` <a name="regionalFact" id="@cloudparing/aws-cdk-lib.Cur2Stack.regionalFact"></a>

```typescript
public regionalFact(factName: string, defaultValue?: string): string
```

Look up a fact value for the given fact for the region of this stack.

Will return a definite value only if the region of the current stack is resolved.
If not, a lookup map will be added to the stack and the lookup will be done at
CDK deployment time.

What regions will be included in the lookup map is controlled by the
`@aws-cdk/core:target-partitions` context value: it must be set to a list
of partitions, and only regions from the given partitions will be included.
If no such context key is set, all regions will be included.

This function is intended to be used by construct library authors. Application
builders can rely on the abstractions offered by construct libraries and do
not have to worry about regional facts.

If `defaultValue` is not given, it is an error if the fact is unknown for
the given region.

###### `factName`<sup>Required</sup> <a name="factName" id="@cloudparing/aws-cdk-lib.Cur2Stack.regionalFact.parameter.factName"></a>

- *Type:* string

---

###### `defaultValue`<sup>Optional</sup> <a name="defaultValue" id="@cloudparing/aws-cdk-lib.Cur2Stack.regionalFact.parameter.defaultValue"></a>

- *Type:* string

---

##### `renameLogicalId` <a name="renameLogicalId" id="@cloudparing/aws-cdk-lib.Cur2Stack.renameLogicalId"></a>

```typescript
public renameLogicalId(oldId: string, newId: string): void
```

Rename a generated logical identities.

To modify the naming scheme strategy, extend the `Stack` class and
override the `allocateLogicalId` method.

###### `oldId`<sup>Required</sup> <a name="oldId" id="@cloudparing/aws-cdk-lib.Cur2Stack.renameLogicalId.parameter.oldId"></a>

- *Type:* string

---

###### `newId`<sup>Required</sup> <a name="newId" id="@cloudparing/aws-cdk-lib.Cur2Stack.renameLogicalId.parameter.newId"></a>

- *Type:* string

---

##### `reportMissingContextKey` <a name="reportMissingContextKey" id="@cloudparing/aws-cdk-lib.Cur2Stack.reportMissingContextKey"></a>

```typescript
public reportMissingContextKey(report: MissingContext): void
```

Indicate that a context key was expected.

Contains instructions which will be emitted into the cloud assembly on how
the key should be supplied.

###### `report`<sup>Required</sup> <a name="report" id="@cloudparing/aws-cdk-lib.Cur2Stack.reportMissingContextKey.parameter.report"></a>

- *Type:* aws-cdk-lib.cloud_assembly_schema.MissingContext

The set of parameters needed to obtain the context.

---

##### `resolve` <a name="resolve" id="@cloudparing/aws-cdk-lib.Cur2Stack.resolve"></a>

```typescript
public resolve(obj: any): any
```

Resolve a tokenized value in the context of the current stack.

###### `obj`<sup>Required</sup> <a name="obj" id="@cloudparing/aws-cdk-lib.Cur2Stack.resolve.parameter.obj"></a>

- *Type:* any

---

##### `splitArn` <a name="splitArn" id="@cloudparing/aws-cdk-lib.Cur2Stack.splitArn"></a>

```typescript
public splitArn(arn: string, arnFormat: ArnFormat): ArnComponents
```

Splits the provided ARN into its components.

Works both if 'arn' is a string like 'arn:aws:s3:::bucket',
and a Token representing a dynamic CloudFormation expression
(in which case the returned components will also be dynamic CloudFormation expressions,
encoded as Tokens).

###### `arn`<sup>Required</sup> <a name="arn" id="@cloudparing/aws-cdk-lib.Cur2Stack.splitArn.parameter.arn"></a>

- *Type:* string

the ARN to split into its components.

---

###### `arnFormat`<sup>Required</sup> <a name="arnFormat" id="@cloudparing/aws-cdk-lib.Cur2Stack.splitArn.parameter.arnFormat"></a>

- *Type:* aws-cdk-lib.ArnFormat

the expected format of 'arn' - depends on what format the service 'arn' represents uses.

---

##### `toJsonString` <a name="toJsonString" id="@cloudparing/aws-cdk-lib.Cur2Stack.toJsonString"></a>

```typescript
public toJsonString(obj: any, space?: number): string
```

Convert an object, potentially containing tokens, to a JSON string.

###### `obj`<sup>Required</sup> <a name="obj" id="@cloudparing/aws-cdk-lib.Cur2Stack.toJsonString.parameter.obj"></a>

- *Type:* any

---

###### `space`<sup>Optional</sup> <a name="space" id="@cloudparing/aws-cdk-lib.Cur2Stack.toJsonString.parameter.space"></a>

- *Type:* number

---

##### `toYamlString` <a name="toYamlString" id="@cloudparing/aws-cdk-lib.Cur2Stack.toYamlString"></a>

```typescript
public toYamlString(obj: any): string
```

Convert an object, potentially containing tokens, to a YAML string.

###### `obj`<sup>Required</sup> <a name="obj" id="@cloudparing/aws-cdk-lib.Cur2Stack.toYamlString.parameter.obj"></a>

- *Type:* any

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2Stack.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2Stack.isStack">isStack</a></code> | Return whether the given object is a Stack. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2Stack.of">of</a></code> | Looks up the first stack scope in which `construct` is defined. |

---

##### `isConstruct` <a name="isConstruct" id="@cloudparing/aws-cdk-lib.Cur2Stack.isConstruct"></a>

```typescript
import { Cur2Stack } from '@cloudparing/aws-cdk-lib'

Cur2Stack.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@cloudparing/aws-cdk-lib.Cur2Stack.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isStack` <a name="isStack" id="@cloudparing/aws-cdk-lib.Cur2Stack.isStack"></a>

```typescript
import { Cur2Stack } from '@cloudparing/aws-cdk-lib'

Cur2Stack.isStack(x: any)
```

Return whether the given object is a Stack.

We do attribute detection since we can't reliably use 'instanceof'.

###### `x`<sup>Required</sup> <a name="x" id="@cloudparing/aws-cdk-lib.Cur2Stack.isStack.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="@cloudparing/aws-cdk-lib.Cur2Stack.of"></a>

```typescript
import { Cur2Stack } from '@cloudparing/aws-cdk-lib'

Cur2Stack.of(construct: IConstruct)
```

Looks up the first stack scope in which `construct` is defined.

Fails if there is no stack up the tree.

###### `construct`<sup>Required</sup> <a name="construct" id="@cloudparing/aws-cdk-lib.Cur2Stack.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

The construct to start the search from.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2Stack.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2Stack.property.account">account</a></code> | <code>string</code> | The AWS account into which this stack will be deployed. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2Stack.property.artifactId">artifactId</a></code> | <code>string</code> | The ID of the cloud assembly artifact for this stack. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2Stack.property.availabilityZones">availabilityZones</a></code> | <code>string[]</code> | Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2Stack.property.bundlingRequired">bundlingRequired</a></code> | <code>boolean</code> | Indicates whether the stack requires bundling or not. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2Stack.property.dependencies">dependencies</a></code> | <code>aws-cdk-lib.Stack[]</code> | Return the stacks this stack depends on. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2Stack.property.environment">environment</a></code> | <code>string</code> | The environment coordinates in which this stack is deployed. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2Stack.property.nested">nested</a></code> | <code>boolean</code> | Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2Stack.property.notificationArns">notificationArns</a></code> | <code>string[]</code> | Returns the list of notification Amazon Resource Names (ARNs) for the current stack. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2Stack.property.partition">partition</a></code> | <code>string</code> | The partition in which this stack is defined. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2Stack.property.region">region</a></code> | <code>string</code> | The AWS region into which this stack will be deployed (e.g. `us-west-2`). |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2Stack.property.stackId">stackId</a></code> | <code>string</code> | The ID of the stack. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2Stack.property.stackName">stackName</a></code> | <code>string</code> | The concrete CloudFormation physical stack name. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2Stack.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method for this stack. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2Stack.property.tags">tags</a></code> | <code>aws-cdk-lib.TagManager</code> | Tags to be applied to the stack. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2Stack.property.templateFile">templateFile</a></code> | <code>string</code> | The name of the CloudFormation template file emitted to the output directory during synthesis. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2Stack.property.templateOptions">templateOptions</a></code> | <code>aws-cdk-lib.ITemplateOptions</code> | Options for CloudFormation template (like version, transform, description). |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2Stack.property.urlSuffix">urlSuffix</a></code> | <code>string</code> | The Amazon domain suffix for the region in which this stack is defined. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2Stack.property.nestedStackParent">nestedStackParent</a></code> | <code>aws-cdk-lib.Stack</code> | If this is a nested stack, returns it's parent stack. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2Stack.property.nestedStackResource">nestedStackResource</a></code> | <code>aws-cdk-lib.CfnResource</code> | If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2Stack.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether termination protection is enabled for this stack. |

---

##### `node`<sup>Required</sup> <a name="node" id="@cloudparing/aws-cdk-lib.Cur2Stack.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `account`<sup>Required</sup> <a name="account" id="@cloudparing/aws-cdk-lib.Cur2Stack.property.account"></a>

```typescript
public readonly account: string;
```

- *Type:* string

The AWS account into which this stack will be deployed.

This value is resolved according to the following rules:

1. The value provided to `env.account` when the stack is defined. This can
   either be a concrete account (e.g. `585695031111`) or the
   `Aws.ACCOUNT_ID` token.
3. `Aws.ACCOUNT_ID`, which represents the CloudFormation intrinsic reference
   `{ "Ref": "AWS::AccountId" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concrete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.account)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **account-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

---

##### `artifactId`<sup>Required</sup> <a name="artifactId" id="@cloudparing/aws-cdk-lib.Cur2Stack.property.artifactId"></a>

```typescript
public readonly artifactId: string;
```

- *Type:* string

The ID of the cloud assembly artifact for this stack.

---

##### `availabilityZones`<sup>Required</sup> <a name="availabilityZones" id="@cloudparing/aws-cdk-lib.Cur2Stack.property.availabilityZones"></a>

```typescript
public readonly availabilityZones: string[];
```

- *Type:* string[]

Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack.

If the stack is environment-agnostic (either account and/or region are
tokens), this property will return an array with 2 tokens that will resolve
at deploy-time to the first two availability zones returned from CloudFormation's
`Fn::GetAZs` intrinsic function.

If they are not available in the context, returns a set of dummy values and
reports them as missing, and let the CLI resolve them by calling EC2
`DescribeAvailabilityZones` on the target environment.

To specify a different strategy for selecting availability zones override this method.

---

##### `bundlingRequired`<sup>Required</sup> <a name="bundlingRequired" id="@cloudparing/aws-cdk-lib.Cur2Stack.property.bundlingRequired"></a>

```typescript
public readonly bundlingRequired: boolean;
```

- *Type:* boolean

Indicates whether the stack requires bundling or not.

---

##### `dependencies`<sup>Required</sup> <a name="dependencies" id="@cloudparing/aws-cdk-lib.Cur2Stack.property.dependencies"></a>

```typescript
public readonly dependencies: Stack[];
```

- *Type:* aws-cdk-lib.Stack[]

Return the stacks this stack depends on.

---

##### `environment`<sup>Required</sup> <a name="environment" id="@cloudparing/aws-cdk-lib.Cur2Stack.property.environment"></a>

```typescript
public readonly environment: string;
```

- *Type:* string

The environment coordinates in which this stack is deployed.

In the form
`aws://account/region`. Use `stack.account` and `stack.region` to obtain
the specific values, no need to parse.

You can use this value to determine if two stacks are targeting the same
environment.

If either `stack.account` or `stack.region` are not concrete values (e.g.
`Aws.ACCOUNT_ID` or `Aws.REGION`) the special strings `unknown-account` and/or
`unknown-region` will be used respectively to indicate this stack is
region/account-agnostic.

---

##### `nested`<sup>Required</sup> <a name="nested" id="@cloudparing/aws-cdk-lib.Cur2Stack.property.nested"></a>

```typescript
public readonly nested: boolean;
```

- *Type:* boolean

Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent.

---

##### `notificationArns`<sup>Required</sup> <a name="notificationArns" id="@cloudparing/aws-cdk-lib.Cur2Stack.property.notificationArns"></a>

```typescript
public readonly notificationArns: string[];
```

- *Type:* string[]

Returns the list of notification Amazon Resource Names (ARNs) for the current stack.

---

##### `partition`<sup>Required</sup> <a name="partition" id="@cloudparing/aws-cdk-lib.Cur2Stack.property.partition"></a>

```typescript
public readonly partition: string;
```

- *Type:* string

The partition in which this stack is defined.

---

##### `region`<sup>Required</sup> <a name="region" id="@cloudparing/aws-cdk-lib.Cur2Stack.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string

The AWS region into which this stack will be deployed (e.g. `us-west-2`).

This value is resolved according to the following rules:

1. The value provided to `env.region` when the stack is defined. This can
   either be a concrete region (e.g. `us-west-2`) or the `Aws.REGION`
   token.
3. `Aws.REGION`, which is represents the CloudFormation intrinsic reference
   `{ "Ref": "AWS::Region" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concrete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.region)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **region-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

---

##### `stackId`<sup>Required</sup> <a name="stackId" id="@cloudparing/aws-cdk-lib.Cur2Stack.property.stackId"></a>

```typescript
public readonly stackId: string;
```

- *Type:* string

The ID of the stack.

---

*Example*

```typescript
// After resolving, looks like
'arn:aws:cloudformation:us-west-2:123456789012:stack/teststack/51af3dc0-da77-11e4-872e-1234567db123'
```


##### `stackName`<sup>Required</sup> <a name="stackName" id="@cloudparing/aws-cdk-lib.Cur2Stack.property.stackName"></a>

```typescript
public readonly stackName: string;
```

- *Type:* string

The concrete CloudFormation physical stack name.

This is either the name defined explicitly in the `stackName` prop or
allocated based on the stack's location in the construct tree. Stacks that
are directly defined under the app use their construct `id` as their stack
name. Stacks that are defined deeper within the tree will use a hashed naming
scheme based on the construct path to ensure uniqueness.

If you wish to obtain the deploy-time AWS::StackName intrinsic,
you can use `Aws.STACK_NAME` directly.

---

##### `synthesizer`<sup>Required</sup> <a name="synthesizer" id="@cloudparing/aws-cdk-lib.Cur2Stack.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer

Synthesis method for this stack.

---

##### `tags`<sup>Required</sup> <a name="tags" id="@cloudparing/aws-cdk-lib.Cur2Stack.property.tags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

Tags to be applied to the stack.

---

##### `templateFile`<sup>Required</sup> <a name="templateFile" id="@cloudparing/aws-cdk-lib.Cur2Stack.property.templateFile"></a>

```typescript
public readonly templateFile: string;
```

- *Type:* string

The name of the CloudFormation template file emitted to the output directory during synthesis.

Example value: `MyStack.template.json`

---

##### `templateOptions`<sup>Required</sup> <a name="templateOptions" id="@cloudparing/aws-cdk-lib.Cur2Stack.property.templateOptions"></a>

```typescript
public readonly templateOptions: ITemplateOptions;
```

- *Type:* aws-cdk-lib.ITemplateOptions

Options for CloudFormation template (like version, transform, description).

---

##### `urlSuffix`<sup>Required</sup> <a name="urlSuffix" id="@cloudparing/aws-cdk-lib.Cur2Stack.property.urlSuffix"></a>

```typescript
public readonly urlSuffix: string;
```

- *Type:* string

The Amazon domain suffix for the region in which this stack is defined.

---

##### `nestedStackParent`<sup>Optional</sup> <a name="nestedStackParent" id="@cloudparing/aws-cdk-lib.Cur2Stack.property.nestedStackParent"></a>

```typescript
public readonly nestedStackParent: Stack;
```

- *Type:* aws-cdk-lib.Stack

If this is a nested stack, returns it's parent stack.

---

##### `nestedStackResource`<sup>Optional</sup> <a name="nestedStackResource" id="@cloudparing/aws-cdk-lib.Cur2Stack.property.nestedStackResource"></a>

```typescript
public readonly nestedStackResource: CfnResource;
```

- *Type:* aws-cdk-lib.CfnResource

If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource.

`undefined` for top-level (non-nested) stacks.

---

##### `terminationProtection`<sup>Required</sup> <a name="terminationProtection" id="@cloudparing/aws-cdk-lib.Cur2Stack.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean

Whether termination protection is enabled for this stack.

---


### CurStack <a name="CurStack" id="@cloudparing/aws-cdk-lib.CurStack"></a>

#### Initializers <a name="Initializers" id="@cloudparing/aws-cdk-lib.CurStack.Initializer"></a>

```typescript
import { CurStack } from '@cloudparing/aws-cdk-lib'

new CurStack(scope: Construct, id: string, props: CurStackProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStack.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStack.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStack.Initializer.parameter.props">props</a></code> | <code><a href="#@cloudparing/aws-cdk-lib.CurStackProps">CurStackProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@cloudparing/aws-cdk-lib.CurStack.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@cloudparing/aws-cdk-lib.CurStack.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@cloudparing/aws-cdk-lib.CurStack.Initializer.parameter.props"></a>

- *Type:* <a href="#@cloudparing/aws-cdk-lib.CurStackProps">CurStackProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStack.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStack.addDependency">addDependency</a></code> | Add a dependency between this stack and another stack. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStack.addMetadata">addMetadata</a></code> | Adds an arbitary key-value pair, with information you want to record about the stack. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStack.addTransform">addTransform</a></code> | Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStack.exportStringListValue">exportStringListValue</a></code> | Create a CloudFormation Export for a string list value. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStack.exportValue">exportValue</a></code> | Create a CloudFormation Export for a string value. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStack.formatArn">formatArn</a></code> | Creates an ARN from components. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStack.getLogicalId">getLogicalId</a></code> | Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStack.regionalFact">regionalFact</a></code> | Look up a fact value for the given fact for the region of this stack. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStack.renameLogicalId">renameLogicalId</a></code> | Rename a generated logical identities. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStack.reportMissingContextKey">reportMissingContextKey</a></code> | Indicate that a context key was expected. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStack.resolve">resolve</a></code> | Resolve a tokenized value in the context of the current stack. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStack.splitArn">splitArn</a></code> | Splits the provided ARN into its components. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStack.toJsonString">toJsonString</a></code> | Convert an object, potentially containing tokens, to a JSON string. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStack.toYamlString">toYamlString</a></code> | Convert an object, potentially containing tokens, to a YAML string. |

---

##### `toString` <a name="toString" id="@cloudparing/aws-cdk-lib.CurStack.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addDependency` <a name="addDependency" id="@cloudparing/aws-cdk-lib.CurStack.addDependency"></a>

```typescript
public addDependency(target: Stack, reason?: string): void
```

Add a dependency between this stack and another stack.

This can be used to define dependencies between any two stacks within an
app, and also supports nested stacks.

###### `target`<sup>Required</sup> <a name="target" id="@cloudparing/aws-cdk-lib.CurStack.addDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.Stack

---

###### `reason`<sup>Optional</sup> <a name="reason" id="@cloudparing/aws-cdk-lib.CurStack.addDependency.parameter.reason"></a>

- *Type:* string

---

##### `addMetadata` <a name="addMetadata" id="@cloudparing/aws-cdk-lib.CurStack.addMetadata"></a>

```typescript
public addMetadata(key: string, value: any): void
```

Adds an arbitary key-value pair, with information you want to record about the stack.

These get translated to the Metadata section of the generated template.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html)

###### `key`<sup>Required</sup> <a name="key" id="@cloudparing/aws-cdk-lib.CurStack.addMetadata.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="@cloudparing/aws-cdk-lib.CurStack.addMetadata.parameter.value"></a>

- *Type:* any

---

##### `addTransform` <a name="addTransform" id="@cloudparing/aws-cdk-lib.CurStack.addTransform"></a>

```typescript
public addTransform(transform: string): void
```

Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template.

Duplicate values are removed when stack is synthesized.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html)

*Example*

```typescript
declare const stack: Stack;

stack.addTransform('AWS::Serverless-2016-10-31')
```


###### `transform`<sup>Required</sup> <a name="transform" id="@cloudparing/aws-cdk-lib.CurStack.addTransform.parameter.transform"></a>

- *Type:* string

The transform to add.

---

##### `exportStringListValue` <a name="exportStringListValue" id="@cloudparing/aws-cdk-lib.CurStack.exportStringListValue"></a>

```typescript
public exportStringListValue(exportedValue: any, options?: ExportValueOptions): string[]
```

Create a CloudFormation Export for a string list value.

Returns a string list representing the corresponding `Fn.importValue()`
expression for this Export. The export expression is automatically wrapped with an
`Fn::Join` and the import value with an `Fn::Split`, since CloudFormation can only
export strings. You can control the name for the export by passing the `name` option.

If you don't supply a value for `name`, the value you're exporting must be
a Resource attribute (for example: `bucket.bucketName`) and it will be
given the same name as the automatic cross-stack reference that would be created
if you used the attribute in another Stack.

One of the uses for this method is to *remove* the relationship between
two Stacks established by automatic cross-stack references. It will
temporarily ensure that the CloudFormation Export still exists while you
remove the reference from the consuming stack. After that, you can remove
the resource and the manual export.

See `exportValue` for an example of this process.

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="@cloudparing/aws-cdk-lib.CurStack.exportStringListValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="@cloudparing/aws-cdk-lib.CurStack.exportStringListValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `exportValue` <a name="exportValue" id="@cloudparing/aws-cdk-lib.CurStack.exportValue"></a>

```typescript
public exportValue(exportedValue: any, options?: ExportValueOptions): string
```

Create a CloudFormation Export for a string value.

Returns a string representing the corresponding `Fn.importValue()`
expression for this Export. You can control the name for the export by
passing the `name` option.

If you don't supply a value for `name`, the value you're exporting must be
a Resource attribute (for example: `bucket.bucketName`) and it will be
given the same name as the automatic cross-stack reference that would be created
if you used the attribute in another Stack.

One of the uses for this method is to *remove* the relationship between
two Stacks established by automatic cross-stack references. It will
temporarily ensure that the CloudFormation Export still exists while you
remove the reference from the consuming stack. After that, you can remove
the resource and the manual export.

## Example

Here is how the process works. Let's say there are two stacks,
`producerStack` and `consumerStack`, and `producerStack` has a bucket
called `bucket`, which is referenced by `consumerStack` (perhaps because
an AWS Lambda Function writes into it, or something like that).

It is not safe to remove `producerStack.bucket` because as the bucket is being
deleted, `consumerStack` might still be using it.

Instead, the process takes two deployments:

### Deployment 1: break the relationship

- Make sure `consumerStack` no longer references `bucket.bucketName` (maybe the consumer
  stack now uses its own bucket, or it writes to an AWS DynamoDB table, or maybe you just
  remove the Lambda Function altogether).
- In the `ProducerStack` class, call `this.exportValue(this.bucket.bucketName)`. This
  will make sure the CloudFormation Export continues to exist while the relationship
  between the two stacks is being broken.
- Deploy (this will effectively only change the `consumerStack`, but it's safe to deploy both).

### Deployment 2: remove the bucket resource

- You are now free to remove the `bucket` resource from `producerStack`.
- Don't forget to remove the `exportValue()` call as well.
- Deploy again (this time only the `producerStack` will be changed -- the bucket will be deleted).

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="@cloudparing/aws-cdk-lib.CurStack.exportValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="@cloudparing/aws-cdk-lib.CurStack.exportValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `formatArn` <a name="formatArn" id="@cloudparing/aws-cdk-lib.CurStack.formatArn"></a>

```typescript
public formatArn(components: ArnComponents): string
```

Creates an ARN from components.

If `partition`, `region` or `account` are not specified, the stack's
partition, region and account will be used.

If any component is the empty string, an empty string will be inserted
into the generated ARN at the location that component corresponds to.

The ARN will be formatted as follows:

  arn:{partition}:{service}:{region}:{account}:{resource}{sep}{resource-name}

The required ARN pieces that are omitted will be taken from the stack that
the 'scope' is attached to. If all ARN pieces are supplied, the supplied scope
can be 'undefined'.

###### `components`<sup>Required</sup> <a name="components" id="@cloudparing/aws-cdk-lib.CurStack.formatArn.parameter.components"></a>

- *Type:* aws-cdk-lib.ArnComponents

---

##### `getLogicalId` <a name="getLogicalId" id="@cloudparing/aws-cdk-lib.CurStack.getLogicalId"></a>

```typescript
public getLogicalId(element: CfnElement): string
```

Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource.

This method is called when a `CfnElement` is created and used to render the
initial logical identity of resources. Logical ID renames are applied at
this stage.

This method uses the protected method `allocateLogicalId` to render the
logical ID for an element. To modify the naming scheme, extend the `Stack`
class and override this method.

###### `element`<sup>Required</sup> <a name="element" id="@cloudparing/aws-cdk-lib.CurStack.getLogicalId.parameter.element"></a>

- *Type:* aws-cdk-lib.CfnElement

The CloudFormation element for which a logical identity is needed.

---

##### `regionalFact` <a name="regionalFact" id="@cloudparing/aws-cdk-lib.CurStack.regionalFact"></a>

```typescript
public regionalFact(factName: string, defaultValue?: string): string
```

Look up a fact value for the given fact for the region of this stack.

Will return a definite value only if the region of the current stack is resolved.
If not, a lookup map will be added to the stack and the lookup will be done at
CDK deployment time.

What regions will be included in the lookup map is controlled by the
`@aws-cdk/core:target-partitions` context value: it must be set to a list
of partitions, and only regions from the given partitions will be included.
If no such context key is set, all regions will be included.

This function is intended to be used by construct library authors. Application
builders can rely on the abstractions offered by construct libraries and do
not have to worry about regional facts.

If `defaultValue` is not given, it is an error if the fact is unknown for
the given region.

###### `factName`<sup>Required</sup> <a name="factName" id="@cloudparing/aws-cdk-lib.CurStack.regionalFact.parameter.factName"></a>

- *Type:* string

---

###### `defaultValue`<sup>Optional</sup> <a name="defaultValue" id="@cloudparing/aws-cdk-lib.CurStack.regionalFact.parameter.defaultValue"></a>

- *Type:* string

---

##### `renameLogicalId` <a name="renameLogicalId" id="@cloudparing/aws-cdk-lib.CurStack.renameLogicalId"></a>

```typescript
public renameLogicalId(oldId: string, newId: string): void
```

Rename a generated logical identities.

To modify the naming scheme strategy, extend the `Stack` class and
override the `allocateLogicalId` method.

###### `oldId`<sup>Required</sup> <a name="oldId" id="@cloudparing/aws-cdk-lib.CurStack.renameLogicalId.parameter.oldId"></a>

- *Type:* string

---

###### `newId`<sup>Required</sup> <a name="newId" id="@cloudparing/aws-cdk-lib.CurStack.renameLogicalId.parameter.newId"></a>

- *Type:* string

---

##### `reportMissingContextKey` <a name="reportMissingContextKey" id="@cloudparing/aws-cdk-lib.CurStack.reportMissingContextKey"></a>

```typescript
public reportMissingContextKey(report: MissingContext): void
```

Indicate that a context key was expected.

Contains instructions which will be emitted into the cloud assembly on how
the key should be supplied.

###### `report`<sup>Required</sup> <a name="report" id="@cloudparing/aws-cdk-lib.CurStack.reportMissingContextKey.parameter.report"></a>

- *Type:* aws-cdk-lib.cloud_assembly_schema.MissingContext

The set of parameters needed to obtain the context.

---

##### `resolve` <a name="resolve" id="@cloudparing/aws-cdk-lib.CurStack.resolve"></a>

```typescript
public resolve(obj: any): any
```

Resolve a tokenized value in the context of the current stack.

###### `obj`<sup>Required</sup> <a name="obj" id="@cloudparing/aws-cdk-lib.CurStack.resolve.parameter.obj"></a>

- *Type:* any

---

##### `splitArn` <a name="splitArn" id="@cloudparing/aws-cdk-lib.CurStack.splitArn"></a>

```typescript
public splitArn(arn: string, arnFormat: ArnFormat): ArnComponents
```

Splits the provided ARN into its components.

Works both if 'arn' is a string like 'arn:aws:s3:::bucket',
and a Token representing a dynamic CloudFormation expression
(in which case the returned components will also be dynamic CloudFormation expressions,
encoded as Tokens).

###### `arn`<sup>Required</sup> <a name="arn" id="@cloudparing/aws-cdk-lib.CurStack.splitArn.parameter.arn"></a>

- *Type:* string

the ARN to split into its components.

---

###### `arnFormat`<sup>Required</sup> <a name="arnFormat" id="@cloudparing/aws-cdk-lib.CurStack.splitArn.parameter.arnFormat"></a>

- *Type:* aws-cdk-lib.ArnFormat

the expected format of 'arn' - depends on what format the service 'arn' represents uses.

---

##### `toJsonString` <a name="toJsonString" id="@cloudparing/aws-cdk-lib.CurStack.toJsonString"></a>

```typescript
public toJsonString(obj: any, space?: number): string
```

Convert an object, potentially containing tokens, to a JSON string.

###### `obj`<sup>Required</sup> <a name="obj" id="@cloudparing/aws-cdk-lib.CurStack.toJsonString.parameter.obj"></a>

- *Type:* any

---

###### `space`<sup>Optional</sup> <a name="space" id="@cloudparing/aws-cdk-lib.CurStack.toJsonString.parameter.space"></a>

- *Type:* number

---

##### `toYamlString` <a name="toYamlString" id="@cloudparing/aws-cdk-lib.CurStack.toYamlString"></a>

```typescript
public toYamlString(obj: any): string
```

Convert an object, potentially containing tokens, to a YAML string.

###### `obj`<sup>Required</sup> <a name="obj" id="@cloudparing/aws-cdk-lib.CurStack.toYamlString.parameter.obj"></a>

- *Type:* any

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStack.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStack.isStack">isStack</a></code> | Return whether the given object is a Stack. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStack.of">of</a></code> | Looks up the first stack scope in which `construct` is defined. |

---

##### `isConstruct` <a name="isConstruct" id="@cloudparing/aws-cdk-lib.CurStack.isConstruct"></a>

```typescript
import { CurStack } from '@cloudparing/aws-cdk-lib'

CurStack.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@cloudparing/aws-cdk-lib.CurStack.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isStack` <a name="isStack" id="@cloudparing/aws-cdk-lib.CurStack.isStack"></a>

```typescript
import { CurStack } from '@cloudparing/aws-cdk-lib'

CurStack.isStack(x: any)
```

Return whether the given object is a Stack.

We do attribute detection since we can't reliably use 'instanceof'.

###### `x`<sup>Required</sup> <a name="x" id="@cloudparing/aws-cdk-lib.CurStack.isStack.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="@cloudparing/aws-cdk-lib.CurStack.of"></a>

```typescript
import { CurStack } from '@cloudparing/aws-cdk-lib'

CurStack.of(construct: IConstruct)
```

Looks up the first stack scope in which `construct` is defined.

Fails if there is no stack up the tree.

###### `construct`<sup>Required</sup> <a name="construct" id="@cloudparing/aws-cdk-lib.CurStack.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

The construct to start the search from.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStack.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStack.property.account">account</a></code> | <code>string</code> | The AWS account into which this stack will be deployed. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStack.property.artifactId">artifactId</a></code> | <code>string</code> | The ID of the cloud assembly artifact for this stack. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStack.property.availabilityZones">availabilityZones</a></code> | <code>string[]</code> | Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStack.property.bundlingRequired">bundlingRequired</a></code> | <code>boolean</code> | Indicates whether the stack requires bundling or not. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStack.property.dependencies">dependencies</a></code> | <code>aws-cdk-lib.Stack[]</code> | Return the stacks this stack depends on. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStack.property.environment">environment</a></code> | <code>string</code> | The environment coordinates in which this stack is deployed. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStack.property.nested">nested</a></code> | <code>boolean</code> | Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStack.property.notificationArns">notificationArns</a></code> | <code>string[]</code> | Returns the list of notification Amazon Resource Names (ARNs) for the current stack. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStack.property.partition">partition</a></code> | <code>string</code> | The partition in which this stack is defined. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStack.property.region">region</a></code> | <code>string</code> | The AWS region into which this stack will be deployed (e.g. `us-west-2`). |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStack.property.stackId">stackId</a></code> | <code>string</code> | The ID of the stack. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStack.property.stackName">stackName</a></code> | <code>string</code> | The concrete CloudFormation physical stack name. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStack.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method for this stack. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStack.property.tags">tags</a></code> | <code>aws-cdk-lib.TagManager</code> | Tags to be applied to the stack. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStack.property.templateFile">templateFile</a></code> | <code>string</code> | The name of the CloudFormation template file emitted to the output directory during synthesis. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStack.property.templateOptions">templateOptions</a></code> | <code>aws-cdk-lib.ITemplateOptions</code> | Options for CloudFormation template (like version, transform, description). |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStack.property.urlSuffix">urlSuffix</a></code> | <code>string</code> | The Amazon domain suffix for the region in which this stack is defined. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStack.property.nestedStackParent">nestedStackParent</a></code> | <code>aws-cdk-lib.Stack</code> | If this is a nested stack, returns it's parent stack. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStack.property.nestedStackResource">nestedStackResource</a></code> | <code>aws-cdk-lib.CfnResource</code> | If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStack.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether termination protection is enabled for this stack. |

---

##### `node`<sup>Required</sup> <a name="node" id="@cloudparing/aws-cdk-lib.CurStack.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `account`<sup>Required</sup> <a name="account" id="@cloudparing/aws-cdk-lib.CurStack.property.account"></a>

```typescript
public readonly account: string;
```

- *Type:* string

The AWS account into which this stack will be deployed.

This value is resolved according to the following rules:

1. The value provided to `env.account` when the stack is defined. This can
   either be a concrete account (e.g. `585695031111`) or the
   `Aws.ACCOUNT_ID` token.
3. `Aws.ACCOUNT_ID`, which represents the CloudFormation intrinsic reference
   `{ "Ref": "AWS::AccountId" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concrete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.account)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **account-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

---

##### `artifactId`<sup>Required</sup> <a name="artifactId" id="@cloudparing/aws-cdk-lib.CurStack.property.artifactId"></a>

```typescript
public readonly artifactId: string;
```

- *Type:* string

The ID of the cloud assembly artifact for this stack.

---

##### `availabilityZones`<sup>Required</sup> <a name="availabilityZones" id="@cloudparing/aws-cdk-lib.CurStack.property.availabilityZones"></a>

```typescript
public readonly availabilityZones: string[];
```

- *Type:* string[]

Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack.

If the stack is environment-agnostic (either account and/or region are
tokens), this property will return an array with 2 tokens that will resolve
at deploy-time to the first two availability zones returned from CloudFormation's
`Fn::GetAZs` intrinsic function.

If they are not available in the context, returns a set of dummy values and
reports them as missing, and let the CLI resolve them by calling EC2
`DescribeAvailabilityZones` on the target environment.

To specify a different strategy for selecting availability zones override this method.

---

##### `bundlingRequired`<sup>Required</sup> <a name="bundlingRequired" id="@cloudparing/aws-cdk-lib.CurStack.property.bundlingRequired"></a>

```typescript
public readonly bundlingRequired: boolean;
```

- *Type:* boolean

Indicates whether the stack requires bundling or not.

---

##### `dependencies`<sup>Required</sup> <a name="dependencies" id="@cloudparing/aws-cdk-lib.CurStack.property.dependencies"></a>

```typescript
public readonly dependencies: Stack[];
```

- *Type:* aws-cdk-lib.Stack[]

Return the stacks this stack depends on.

---

##### `environment`<sup>Required</sup> <a name="environment" id="@cloudparing/aws-cdk-lib.CurStack.property.environment"></a>

```typescript
public readonly environment: string;
```

- *Type:* string

The environment coordinates in which this stack is deployed.

In the form
`aws://account/region`. Use `stack.account` and `stack.region` to obtain
the specific values, no need to parse.

You can use this value to determine if two stacks are targeting the same
environment.

If either `stack.account` or `stack.region` are not concrete values (e.g.
`Aws.ACCOUNT_ID` or `Aws.REGION`) the special strings `unknown-account` and/or
`unknown-region` will be used respectively to indicate this stack is
region/account-agnostic.

---

##### `nested`<sup>Required</sup> <a name="nested" id="@cloudparing/aws-cdk-lib.CurStack.property.nested"></a>

```typescript
public readonly nested: boolean;
```

- *Type:* boolean

Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent.

---

##### `notificationArns`<sup>Required</sup> <a name="notificationArns" id="@cloudparing/aws-cdk-lib.CurStack.property.notificationArns"></a>

```typescript
public readonly notificationArns: string[];
```

- *Type:* string[]

Returns the list of notification Amazon Resource Names (ARNs) for the current stack.

---

##### `partition`<sup>Required</sup> <a name="partition" id="@cloudparing/aws-cdk-lib.CurStack.property.partition"></a>

```typescript
public readonly partition: string;
```

- *Type:* string

The partition in which this stack is defined.

---

##### `region`<sup>Required</sup> <a name="region" id="@cloudparing/aws-cdk-lib.CurStack.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string

The AWS region into which this stack will be deployed (e.g. `us-west-2`).

This value is resolved according to the following rules:

1. The value provided to `env.region` when the stack is defined. This can
   either be a concrete region (e.g. `us-west-2`) or the `Aws.REGION`
   token.
3. `Aws.REGION`, which is represents the CloudFormation intrinsic reference
   `{ "Ref": "AWS::Region" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concrete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.region)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **region-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

---

##### `stackId`<sup>Required</sup> <a name="stackId" id="@cloudparing/aws-cdk-lib.CurStack.property.stackId"></a>

```typescript
public readonly stackId: string;
```

- *Type:* string

The ID of the stack.

---

*Example*

```typescript
// After resolving, looks like
'arn:aws:cloudformation:us-west-2:123456789012:stack/teststack/51af3dc0-da77-11e4-872e-1234567db123'
```


##### `stackName`<sup>Required</sup> <a name="stackName" id="@cloudparing/aws-cdk-lib.CurStack.property.stackName"></a>

```typescript
public readonly stackName: string;
```

- *Type:* string

The concrete CloudFormation physical stack name.

This is either the name defined explicitly in the `stackName` prop or
allocated based on the stack's location in the construct tree. Stacks that
are directly defined under the app use their construct `id` as their stack
name. Stacks that are defined deeper within the tree will use a hashed naming
scheme based on the construct path to ensure uniqueness.

If you wish to obtain the deploy-time AWS::StackName intrinsic,
you can use `Aws.STACK_NAME` directly.

---

##### `synthesizer`<sup>Required</sup> <a name="synthesizer" id="@cloudparing/aws-cdk-lib.CurStack.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer

Synthesis method for this stack.

---

##### `tags`<sup>Required</sup> <a name="tags" id="@cloudparing/aws-cdk-lib.CurStack.property.tags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

Tags to be applied to the stack.

---

##### `templateFile`<sup>Required</sup> <a name="templateFile" id="@cloudparing/aws-cdk-lib.CurStack.property.templateFile"></a>

```typescript
public readonly templateFile: string;
```

- *Type:* string

The name of the CloudFormation template file emitted to the output directory during synthesis.

Example value: `MyStack.template.json`

---

##### `templateOptions`<sup>Required</sup> <a name="templateOptions" id="@cloudparing/aws-cdk-lib.CurStack.property.templateOptions"></a>

```typescript
public readonly templateOptions: ITemplateOptions;
```

- *Type:* aws-cdk-lib.ITemplateOptions

Options for CloudFormation template (like version, transform, description).

---

##### `urlSuffix`<sup>Required</sup> <a name="urlSuffix" id="@cloudparing/aws-cdk-lib.CurStack.property.urlSuffix"></a>

```typescript
public readonly urlSuffix: string;
```

- *Type:* string

The Amazon domain suffix for the region in which this stack is defined.

---

##### `nestedStackParent`<sup>Optional</sup> <a name="nestedStackParent" id="@cloudparing/aws-cdk-lib.CurStack.property.nestedStackParent"></a>

```typescript
public readonly nestedStackParent: Stack;
```

- *Type:* aws-cdk-lib.Stack

If this is a nested stack, returns it's parent stack.

---

##### `nestedStackResource`<sup>Optional</sup> <a name="nestedStackResource" id="@cloudparing/aws-cdk-lib.CurStack.property.nestedStackResource"></a>

```typescript
public readonly nestedStackResource: CfnResource;
```

- *Type:* aws-cdk-lib.CfnResource

If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource.

`undefined` for top-level (non-nested) stacks.

---

##### `terminationProtection`<sup>Required</sup> <a name="terminationProtection" id="@cloudparing/aws-cdk-lib.CurStack.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean

Whether termination protection is enabled for this stack.

---


### DataExportDefinition <a name="DataExportDefinition" id="@cloudparing/aws-cdk-lib.DataExportDefinition"></a>

#### Initializers <a name="Initializers" id="@cloudparing/aws-cdk-lib.DataExportDefinition.Initializer"></a>

```typescript
import { DataExportDefinition } from '@cloudparing/aws-cdk-lib'

new DataExportDefinition(scope: Construct, id: string, props: DataExportDefinitionProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cloudparing/aws-cdk-lib.DataExportDefinition.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@cloudparing/aws-cdk-lib.DataExportDefinition.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@cloudparing/aws-cdk-lib.DataExportDefinition.Initializer.parameter.props">props</a></code> | <code><a href="#@cloudparing/aws-cdk-lib.DataExportDefinitionProps">DataExportDefinitionProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@cloudparing/aws-cdk-lib.DataExportDefinition.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@cloudparing/aws-cdk-lib.DataExportDefinition.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@cloudparing/aws-cdk-lib.DataExportDefinition.Initializer.parameter.props"></a>

- *Type:* <a href="#@cloudparing/aws-cdk-lib.DataExportDefinitionProps">DataExportDefinitionProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cloudparing/aws-cdk-lib.DataExportDefinition.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@cloudparing/aws-cdk-lib.DataExportDefinition.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cloudparing/aws-cdk-lib.DataExportDefinition.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="@cloudparing/aws-cdk-lib.DataExportDefinition.isConstruct"></a>

```typescript
import { DataExportDefinition } from '@cloudparing/aws-cdk-lib'

DataExportDefinition.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@cloudparing/aws-cdk-lib.DataExportDefinition.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cloudparing/aws-cdk-lib.DataExportDefinition.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@cloudparing/aws-cdk-lib.DataExportDefinition.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


### ReportDefinition <a name="ReportDefinition" id="@cloudparing/aws-cdk-lib.ReportDefinition"></a>

#### Initializers <a name="Initializers" id="@cloudparing/aws-cdk-lib.ReportDefinition.Initializer"></a>

```typescript
import { ReportDefinition } from '@cloudparing/aws-cdk-lib'

new ReportDefinition(scope: Construct, id: string, props: ReportDefinitionProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cloudparing/aws-cdk-lib.ReportDefinition.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@cloudparing/aws-cdk-lib.ReportDefinition.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@cloudparing/aws-cdk-lib.ReportDefinition.Initializer.parameter.props">props</a></code> | <code><a href="#@cloudparing/aws-cdk-lib.ReportDefinitionProps">ReportDefinitionProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@cloudparing/aws-cdk-lib.ReportDefinition.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@cloudparing/aws-cdk-lib.ReportDefinition.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@cloudparing/aws-cdk-lib.ReportDefinition.Initializer.parameter.props"></a>

- *Type:* <a href="#@cloudparing/aws-cdk-lib.ReportDefinitionProps">ReportDefinitionProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cloudparing/aws-cdk-lib.ReportDefinition.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@cloudparing/aws-cdk-lib.ReportDefinition.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cloudparing/aws-cdk-lib.ReportDefinition.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="@cloudparing/aws-cdk-lib.ReportDefinition.isConstruct"></a>

```typescript
import { ReportDefinition } from '@cloudparing/aws-cdk-lib'

ReportDefinition.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@cloudparing/aws-cdk-lib.ReportDefinition.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cloudparing/aws-cdk-lib.ReportDefinition.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@cloudparing/aws-cdk-lib.ReportDefinition.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


## Structs <a name="Structs" id="Structs"></a>

### Cur2ContentOptions <a name="Cur2ContentOptions" id="@cloudparing/aws-cdk-lib.Cur2ContentOptions"></a>

#### Initializer <a name="Initializer" id="@cloudparing/aws-cdk-lib.Cur2ContentOptions.Initializer"></a>

```typescript
import { Cur2ContentOptions } from '@cloudparing/aws-cdk-lib'

const cur2ContentOptions: Cur2ContentOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2ContentOptions.property.columns">columns</a></code> | <code>string[]</code> | The columns that you want to include in your data query. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2ContentOptions.property.includeResourceIds">includeResourceIds</a></code> | <code>boolean</code> | Include a column containing the unique AWS resource ID for applicable line items. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2ContentOptions.property.splitCostAllocationData">splitCostAllocationData</a></code> | <code>boolean</code> | Include detailed cost and usage for shared resources for cost allocation (only available for Amazon ECS). |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2ContentOptions.property.timeUnit">timeUnit</a></code> | <code>string</code> | The time granularity for how you want the line items in the export to be aggregated. |

---

##### `columns`<sup>Optional</sup> <a name="columns" id="@cloudparing/aws-cdk-lib.Cur2ContentOptions.property.columns"></a>

```typescript
public readonly columns: string[];
```

- *Type:* string[]
- *Default:* false

The columns that you want to include in your data query.

This allows
you to create exports with consistent schemas, remove sensitive cost data,
and reduce the file size of the export. By default, all columns are selected

---

##### `includeResourceIds`<sup>Optional</sup> <a name="includeResourceIds" id="@cloudparing/aws-cdk-lib.Cur2ContentOptions.property.includeResourceIds"></a>

```typescript
public readonly includeResourceIds: boolean;
```

- *Type:* boolean
- *Default:* false

Include a column containing the unique AWS resource ID for applicable line items.

Including individual resource IDs in your export might
increase the file size

---

##### `splitCostAllocationData`<sup>Optional</sup> <a name="splitCostAllocationData" id="@cloudparing/aws-cdk-lib.Cur2ContentOptions.property.splitCostAllocationData"></a>

```typescript
public readonly splitCostAllocationData: boolean;
```

- *Type:* boolean
- *Default:* false

Include detailed cost and usage for shared resources for cost allocation (only available for Amazon ECS).

Including these resources introduces new
rows and columns in the Cost and Usage Report and might increase the file size

---

##### `timeUnit`<sup>Optional</sup> <a name="timeUnit" id="@cloudparing/aws-cdk-lib.Cur2ContentOptions.property.timeUnit"></a>

```typescript
public readonly timeUnit: string;
```

- *Type:* string
- *Default:* HOURLY

The time granularity for how you want the line items in the export to be aggregated.

---

### Cur2DeliveryOptions <a name="Cur2DeliveryOptions" id="@cloudparing/aws-cdk-lib.Cur2DeliveryOptions"></a>

#### Initializer <a name="Initializer" id="@cloudparing/aws-cdk-lib.Cur2DeliveryOptions.Initializer"></a>

```typescript
import { Cur2DeliveryOptions } from '@cloudparing/aws-cdk-lib'

const cur2DeliveryOptions: Cur2DeliveryOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2DeliveryOptions.property.compressionFormat">compressionFormat</a></code> | <code>string</code> | The compression type and file format for your export. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2DeliveryOptions.property.exportVersioning">exportVersioning</a></code> | <code>string</code> | Whether you want each version of the data export file to overwrite the previous version or to be delivered in addition to the previous versions. |

---

##### `compressionFormat`<sup>Optional</sup> <a name="compressionFormat" id="@cloudparing/aws-cdk-lib.Cur2DeliveryOptions.property.compressionFormat"></a>

```typescript
public readonly compressionFormat: string;
```

- *Type:* string
- *Default:* GZIP_CSV

The compression type and file format for your export.

---

##### `exportVersioning`<sup>Optional</sup> <a name="exportVersioning" id="@cloudparing/aws-cdk-lib.Cur2DeliveryOptions.property.exportVersioning"></a>

```typescript
public readonly exportVersioning: string;
```

- *Type:* string
- *Default:* OVERWRITE_EXPORT

Whether you want each version of the data export file to overwrite the previous version or to be delivered in addition to the previous versions.

---

### Cur2ExportOptions <a name="Cur2ExportOptions" id="@cloudparing/aws-cdk-lib.Cur2ExportOptions"></a>

#### Initializer <a name="Initializer" id="@cloudparing/aws-cdk-lib.Cur2ExportOptions.Initializer"></a>

```typescript
import { Cur2ExportOptions } from '@cloudparing/aws-cdk-lib'

const cur2ExportOptions: Cur2ExportOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2ExportOptions.property.description">description</a></code> | <code>string</code> | The description for this specific data export. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2ExportOptions.property.name">name</a></code> | <code>string</code> | The name of this specific data export. |

---

##### `description`<sup>Optional</sup> <a name="description" id="@cloudparing/aws-cdk-lib.Cur2ExportOptions.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

The description for this specific data export.

---

##### `name`<sup>Optional</sup> <a name="name" id="@cloudparing/aws-cdk-lib.Cur2ExportOptions.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of this specific data export.

---

### Cur2ExportProps <a name="Cur2ExportProps" id="@cloudparing/aws-cdk-lib.Cur2ExportProps"></a>

#### Initializer <a name="Initializer" id="@cloudparing/aws-cdk-lib.Cur2ExportProps.Initializer"></a>

```typescript
import { Cur2ExportProps } from '@cloudparing/aws-cdk-lib'

const cur2ExportProps: Cur2ExportProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2ExportProps.property.description">description</a></code> | <code>string</code> | The description for this specific data export. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2ExportProps.property.name">name</a></code> | <code>string</code> | The name of this specific data export. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2ExportProps.property.columns">columns</a></code> | <code>string[]</code> | The columns that you want to include in your data query. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2ExportProps.property.includeResourceIds">includeResourceIds</a></code> | <code>boolean</code> | Include a column containing the unique AWS resource ID for applicable line items. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2ExportProps.property.splitCostAllocationData">splitCostAllocationData</a></code> | <code>boolean</code> | Include detailed cost and usage for shared resources for cost allocation (only available for Amazon ECS). |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2ExportProps.property.timeUnit">timeUnit</a></code> | <code>string</code> | The time granularity for how you want the line items in the export to be aggregated. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2ExportProps.property.compressionFormat">compressionFormat</a></code> | <code>string</code> | The compression type and file format for your export. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2ExportProps.property.exportVersioning">exportVersioning</a></code> | <code>string</code> | Whether you want each version of the data export file to overwrite the previous version or to be delivered in addition to the previous versions. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2ExportProps.property.bucket">bucket</a></code> | <code>aws-cdk-lib.aws_s3.IBucket</code> | The S3 bucket where your data export will be stored. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2ExportProps.property.s3Prefix">s3Prefix</a></code> | <code>string</code> | The prefix that AWS adds to the report name when AWS delivers the report. |

---

##### `description`<sup>Optional</sup> <a name="description" id="@cloudparing/aws-cdk-lib.Cur2ExportProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

The description for this specific data export.

---

##### `name`<sup>Optional</sup> <a name="name" id="@cloudparing/aws-cdk-lib.Cur2ExportProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of this specific data export.

---

##### `columns`<sup>Optional</sup> <a name="columns" id="@cloudparing/aws-cdk-lib.Cur2ExportProps.property.columns"></a>

```typescript
public readonly columns: string[];
```

- *Type:* string[]
- *Default:* false

The columns that you want to include in your data query.

This allows
you to create exports with consistent schemas, remove sensitive cost data,
and reduce the file size of the export. By default, all columns are selected

---

##### `includeResourceIds`<sup>Optional</sup> <a name="includeResourceIds" id="@cloudparing/aws-cdk-lib.Cur2ExportProps.property.includeResourceIds"></a>

```typescript
public readonly includeResourceIds: boolean;
```

- *Type:* boolean
- *Default:* false

Include a column containing the unique AWS resource ID for applicable line items.

Including individual resource IDs in your export might
increase the file size

---

##### `splitCostAllocationData`<sup>Optional</sup> <a name="splitCostAllocationData" id="@cloudparing/aws-cdk-lib.Cur2ExportProps.property.splitCostAllocationData"></a>

```typescript
public readonly splitCostAllocationData: boolean;
```

- *Type:* boolean
- *Default:* false

Include detailed cost and usage for shared resources for cost allocation (only available for Amazon ECS).

Including these resources introduces new
rows and columns in the Cost and Usage Report and might increase the file size

---

##### `timeUnit`<sup>Optional</sup> <a name="timeUnit" id="@cloudparing/aws-cdk-lib.Cur2ExportProps.property.timeUnit"></a>

```typescript
public readonly timeUnit: string;
```

- *Type:* string
- *Default:* HOURLY

The time granularity for how you want the line items in the export to be aggregated.

---

##### `compressionFormat`<sup>Optional</sup> <a name="compressionFormat" id="@cloudparing/aws-cdk-lib.Cur2ExportProps.property.compressionFormat"></a>

```typescript
public readonly compressionFormat: string;
```

- *Type:* string
- *Default:* GZIP_CSV

The compression type and file format for your export.

---

##### `exportVersioning`<sup>Optional</sup> <a name="exportVersioning" id="@cloudparing/aws-cdk-lib.Cur2ExportProps.property.exportVersioning"></a>

```typescript
public readonly exportVersioning: string;
```

- *Type:* string
- *Default:* OVERWRITE_EXPORT

Whether you want each version of the data export file to overwrite the previous version or to be delivered in addition to the previous versions.

---

##### `bucket`<sup>Required</sup> <a name="bucket" id="@cloudparing/aws-cdk-lib.Cur2ExportProps.property.bucket"></a>

```typescript
public readonly bucket: IBucket;
```

- *Type:* aws-cdk-lib.aws_s3.IBucket

The S3 bucket where your data export will be stored.

Length Constraints: Maximum length of 256.
   Pattern: [A-Za-z0-9_\.\-]+

---

##### `s3Prefix`<sup>Optional</sup> <a name="s3Prefix" id="@cloudparing/aws-cdk-lib.Cur2ExportProps.property.s3Prefix"></a>

```typescript
public readonly s3Prefix: string;
```

- *Type:* string
- *Default:* ""

The prefix that AWS adds to the report name when AWS delivers the report.

Your prefix can't include spaces.
   Length Constraints: Maximum length of 256.
   Pattern: [A-Za-z0-9_\.\-]*

---

### Cur2StackProps <a name="Cur2StackProps" id="@cloudparing/aws-cdk-lib.Cur2StackProps"></a>

#### Initializer <a name="Initializer" id="@cloudparing/aws-cdk-lib.Cur2StackProps.Initializer"></a>

```typescript
import { Cur2StackProps } from '@cloudparing/aws-cdk-lib'

const cur2StackProps: Cur2StackProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2StackProps.property.analyticsReporting">analyticsReporting</a></code> | <code>boolean</code> | Include runtime versioning information in this Stack. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2StackProps.property.crossRegionReferences">crossRegionReferences</a></code> | <code>boolean</code> | Enable this flag to allow native cross region stack references. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2StackProps.property.description">description</a></code> | <code>string</code> | A description of the stack. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2StackProps.property.env">env</a></code> | <code>aws-cdk-lib.Environment</code> | The AWS environment (account/region) where this stack will be deployed. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2StackProps.property.permissionsBoundary">permissionsBoundary</a></code> | <code>aws-cdk-lib.PermissionsBoundary</code> | Options for applying a permissions boundary to all IAM Roles and Users created within this Stage. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2StackProps.property.stackName">stackName</a></code> | <code>string</code> | Name to deploy the stack with. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2StackProps.property.suppressTemplateIndentation">suppressTemplateIndentation</a></code> | <code>boolean</code> | Enable this flag to suppress indentation in generated CloudFormation templates. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2StackProps.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method to use while deploying this stack. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2StackProps.property.tags">tags</a></code> | <code>{[ key: string ]: string}</code> | Stack tags that will be applied to all the taggable resources and the stack itself. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2StackProps.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether to enable termination protection for this stack. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2StackProps.property.columns">columns</a></code> | <code>string[]</code> | The columns that you want to include in your data query. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2StackProps.property.includeResourceIds">includeResourceIds</a></code> | <code>boolean</code> | Include a column containing the unique AWS resource ID for applicable line items. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2StackProps.property.splitCostAllocationData">splitCostAllocationData</a></code> | <code>boolean</code> | Include detailed cost and usage for shared resources for cost allocation (only available for Amazon ECS). |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2StackProps.property.timeUnit">timeUnit</a></code> | <code>string</code> | The time granularity for how you want the line items in the export to be aggregated. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2StackProps.property.compressionFormat">compressionFormat</a></code> | <code>string</code> | The compression type and file format for your export. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2StackProps.property.exportVersioning">exportVersioning</a></code> | <code>string</code> | Whether you want each version of the data export file to overwrite the previous version or to be delivered in addition to the previous versions. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2StackProps.property.bucket">bucket</a></code> | <code>aws-cdk-lib.aws_s3.IBucket</code> | The S3 bucket where your data export will be stored. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2StackProps.property.exportDescription">exportDescription</a></code> | <code>string</code> | The description for this specific data export. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2StackProps.property.name">name</a></code> | <code>string</code> | The name of this specific data export. |
| <code><a href="#@cloudparing/aws-cdk-lib.Cur2StackProps.property.s3Prefix">s3Prefix</a></code> | <code>string</code> | The prefix that AWS adds to the report name when AWS delivers the report. |

---

##### `analyticsReporting`<sup>Optional</sup> <a name="analyticsReporting" id="@cloudparing/aws-cdk-lib.Cur2StackProps.property.analyticsReporting"></a>

```typescript
public readonly analyticsReporting: boolean;
```

- *Type:* boolean
- *Default:* `analyticsReporting` setting of containing `App`, or value of 'aws:cdk:version-reporting' context key

Include runtime versioning information in this Stack.

---

##### `crossRegionReferences`<sup>Optional</sup> <a name="crossRegionReferences" id="@cloudparing/aws-cdk-lib.Cur2StackProps.property.crossRegionReferences"></a>

```typescript
public readonly crossRegionReferences: boolean;
```

- *Type:* boolean
- *Default:* false

Enable this flag to allow native cross region stack references.

Enabling this will create a CloudFormation custom resource
in both the producing stack and consuming stack in order to perform the export/import

This feature is currently experimental

---

##### `description`<sup>Optional</sup> <a name="description" id="@cloudparing/aws-cdk-lib.Cur2StackProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* No description.

A description of the stack.

---

##### `env`<sup>Optional</sup> <a name="env" id="@cloudparing/aws-cdk-lib.Cur2StackProps.property.env"></a>

```typescript
public readonly env: Environment;
```

- *Type:* aws-cdk-lib.Environment
- *Default:* The environment of the containing `Stage` if available, otherwise create the stack will be environment-agnostic.

The AWS environment (account/region) where this stack will be deployed.

Set the `region`/`account` fields of `env` to either a concrete value to
select the indicated environment (recommended for production stacks), or to
the values of environment variables
`CDK_DEFAULT_REGION`/`CDK_DEFAULT_ACCOUNT` to let the target environment
depend on the AWS credentials/configuration that the CDK CLI is executed
under (recommended for development stacks).

If the `Stack` is instantiated inside a `Stage`, any undefined
`region`/`account` fields from `env` will default to the same field on the
encompassing `Stage`, if configured there.

If either `region` or `account` are not set nor inherited from `Stage`, the
Stack will be considered "*environment-agnostic*"". Environment-agnostic
stacks can be deployed to any environment but may not be able to take
advantage of all features of the CDK. For example, they will not be able to
use environmental context lookups such as `ec2.Vpc.fromLookup` and will not
automatically translate Service Principals to the right format based on the
environment's AWS partition, and other such enhancements.

---

*Example*

```typescript
// Use a concrete account and region to deploy this stack to:
// `.account` and `.region` will simply return these values.
new Stack(app, 'Stack1', {
  env: {
    account: '123456789012',
    region: 'us-east-1'
  },
});

// Use the CLI's current credentials to determine the target environment:
// `.account` and `.region` will reflect the account+region the CLI
// is configured to use (based on the user CLI credentials)
new Stack(app, 'Stack2', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  },
});

// Define multiple stacks stage associated with an environment
const myStage = new Stage(app, 'MyStage', {
  env: {
    account: '123456789012',
    region: 'us-east-1'
  }
});

// both of these stacks will use the stage's account/region:
// `.account` and `.region` will resolve to the concrete values as above
new MyStack(myStage, 'Stack1');
new YourStack(myStage, 'Stack2');

// Define an environment-agnostic stack:
// `.account` and `.region` will resolve to `{ "Ref": "AWS::AccountId" }` and `{ "Ref": "AWS::Region" }` respectively.
// which will only resolve to actual values by CloudFormation during deployment.
new MyStack(app, 'Stack1');
```


##### `permissionsBoundary`<sup>Optional</sup> <a name="permissionsBoundary" id="@cloudparing/aws-cdk-lib.Cur2StackProps.property.permissionsBoundary"></a>

```typescript
public readonly permissionsBoundary: PermissionsBoundary;
```

- *Type:* aws-cdk-lib.PermissionsBoundary
- *Default:* no permissions boundary is applied

Options for applying a permissions boundary to all IAM Roles and Users created within this Stage.

---

##### `stackName`<sup>Optional</sup> <a name="stackName" id="@cloudparing/aws-cdk-lib.Cur2StackProps.property.stackName"></a>

```typescript
public readonly stackName: string;
```

- *Type:* string
- *Default:* Derived from construct path.

Name to deploy the stack with.

---

##### `suppressTemplateIndentation`<sup>Optional</sup> <a name="suppressTemplateIndentation" id="@cloudparing/aws-cdk-lib.Cur2StackProps.property.suppressTemplateIndentation"></a>

```typescript
public readonly suppressTemplateIndentation: boolean;
```

- *Type:* boolean
- *Default:* the value of `@aws-cdk/core:suppressTemplateIndentation`, or `false` if that is not set.

Enable this flag to suppress indentation in generated CloudFormation templates.

If not specified, the value of the `@aws-cdk/core:suppressTemplateIndentation`
context key will be used. If that is not specified, then the
default value `false` will be used.

---

##### `synthesizer`<sup>Optional</sup> <a name="synthesizer" id="@cloudparing/aws-cdk-lib.Cur2StackProps.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer
- *Default:* The synthesizer specified on `App`, or `DefaultStackSynthesizer` otherwise.

Synthesis method to use while deploying this stack.

The Stack Synthesizer controls aspects of synthesis and deployment,
like how assets are referenced and what IAM roles to use. For more
information, see the README of the main CDK package.

If not specified, the `defaultStackSynthesizer` from `App` will be used.
If that is not specified, `DefaultStackSynthesizer` is used if
`@aws-cdk/core:newStyleStackSynthesis` is set to `true` or the CDK major
version is v2. In CDK v1 `LegacyStackSynthesizer` is the default if no
other synthesizer is specified.

---

##### `tags`<sup>Optional</sup> <a name="tags" id="@cloudparing/aws-cdk-lib.Cur2StackProps.property.tags"></a>

```typescript
public readonly tags: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* {}

Stack tags that will be applied to all the taggable resources and the stack itself.

---

##### `terminationProtection`<sup>Optional</sup> <a name="terminationProtection" id="@cloudparing/aws-cdk-lib.Cur2StackProps.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean
- *Default:* false

Whether to enable termination protection for this stack.

---

##### `columns`<sup>Optional</sup> <a name="columns" id="@cloudparing/aws-cdk-lib.Cur2StackProps.property.columns"></a>

```typescript
public readonly columns: string[];
```

- *Type:* string[]
- *Default:* false

The columns that you want to include in your data query.

This allows
you to create exports with consistent schemas, remove sensitive cost data,
and reduce the file size of the export. By default, all columns are selected

---

##### `includeResourceIds`<sup>Optional</sup> <a name="includeResourceIds" id="@cloudparing/aws-cdk-lib.Cur2StackProps.property.includeResourceIds"></a>

```typescript
public readonly includeResourceIds: boolean;
```

- *Type:* boolean
- *Default:* false

Include a column containing the unique AWS resource ID for applicable line items.

Including individual resource IDs in your export might
increase the file size

---

##### `splitCostAllocationData`<sup>Optional</sup> <a name="splitCostAllocationData" id="@cloudparing/aws-cdk-lib.Cur2StackProps.property.splitCostAllocationData"></a>

```typescript
public readonly splitCostAllocationData: boolean;
```

- *Type:* boolean
- *Default:* false

Include detailed cost and usage for shared resources for cost allocation (only available for Amazon ECS).

Including these resources introduces new
rows and columns in the Cost and Usage Report and might increase the file size

---

##### `timeUnit`<sup>Optional</sup> <a name="timeUnit" id="@cloudparing/aws-cdk-lib.Cur2StackProps.property.timeUnit"></a>

```typescript
public readonly timeUnit: string;
```

- *Type:* string
- *Default:* HOURLY

The time granularity for how you want the line items in the export to be aggregated.

---

##### `compressionFormat`<sup>Optional</sup> <a name="compressionFormat" id="@cloudparing/aws-cdk-lib.Cur2StackProps.property.compressionFormat"></a>

```typescript
public readonly compressionFormat: string;
```

- *Type:* string
- *Default:* GZIP_CSV

The compression type and file format for your export.

---

##### `exportVersioning`<sup>Optional</sup> <a name="exportVersioning" id="@cloudparing/aws-cdk-lib.Cur2StackProps.property.exportVersioning"></a>

```typescript
public readonly exportVersioning: string;
```

- *Type:* string
- *Default:* OVERWRITE_EXPORT

Whether you want each version of the data export file to overwrite the previous version or to be delivered in addition to the previous versions.

---

##### `bucket`<sup>Optional</sup> <a name="bucket" id="@cloudparing/aws-cdk-lib.Cur2StackProps.property.bucket"></a>

```typescript
public readonly bucket: IBucket;
```

- *Type:* aws-cdk-lib.aws_s3.IBucket

The S3 bucket where your data export will be stored.

Length Constraints: Maximum length of 256.
   Pattern: [A-Za-z0-9_\.\-]+

---

##### `exportDescription`<sup>Optional</sup> <a name="exportDescription" id="@cloudparing/aws-cdk-lib.Cur2StackProps.property.exportDescription"></a>

```typescript
public readonly exportDescription: string;
```

- *Type:* string

The description for this specific data export.

---

##### `name`<sup>Optional</sup> <a name="name" id="@cloudparing/aws-cdk-lib.Cur2StackProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of this specific data export.

---

##### `s3Prefix`<sup>Optional</sup> <a name="s3Prefix" id="@cloudparing/aws-cdk-lib.Cur2StackProps.property.s3Prefix"></a>

```typescript
public readonly s3Prefix: string;
```

- *Type:* string
- *Default:* ""

The prefix that AWS adds to the report name when AWS delivers the report.

Your prefix can't include spaces.
   Length Constraints: Maximum length of 256.
   Pattern: [A-Za-z0-9_\.\-]*

---

### CurStackProps <a name="CurStackProps" id="@cloudparing/aws-cdk-lib.CurStackProps"></a>

#### Initializer <a name="Initializer" id="@cloudparing/aws-cdk-lib.CurStackProps.Initializer"></a>

```typescript
import { CurStackProps } from '@cloudparing/aws-cdk-lib'

const curStackProps: CurStackProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStackProps.property.analyticsReporting">analyticsReporting</a></code> | <code>boolean</code> | Include runtime versioning information in this Stack. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStackProps.property.crossRegionReferences">crossRegionReferences</a></code> | <code>boolean</code> | Enable this flag to allow native cross region stack references. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStackProps.property.description">description</a></code> | <code>string</code> | A description of the stack. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStackProps.property.env">env</a></code> | <code>aws-cdk-lib.Environment</code> | The AWS environment (account/region) where this stack will be deployed. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStackProps.property.permissionsBoundary">permissionsBoundary</a></code> | <code>aws-cdk-lib.PermissionsBoundary</code> | Options for applying a permissions boundary to all IAM Roles and Users created within this Stage. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStackProps.property.stackName">stackName</a></code> | <code>string</code> | Name to deploy the stack with. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStackProps.property.suppressTemplateIndentation">suppressTemplateIndentation</a></code> | <code>boolean</code> | Enable this flag to suppress indentation in generated CloudFormation templates. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStackProps.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method to use while deploying this stack. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStackProps.property.tags">tags</a></code> | <code>{[ key: string ]: string}</code> | Stack tags that will be applied to all the taggable resources and the stack itself. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStackProps.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether to enable termination protection for this stack. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStackProps.property.additionalArtifacts">additionalArtifacts</a></code> | <code>string[]</code> | A list of manifests that you want Amazon Web Services to create for this report. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStackProps.property.additionalSchemaElements">additionalSchemaElements</a></code> | <code>string[]</code> | A list of strings that indicate additional content that Amazon Web Services includes in the report, such as individual resource IDs. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStackProps.property.billingViewArn">billingViewArn</a></code> | <code>string</code> | The Amazon Resource Name (ARN) of the billing view. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStackProps.property.compression">compression</a></code> | <code>string</code> | The compression format that Amazon Web Services uses for the report. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStackProps.property.format">format</a></code> | <code>string</code> | The format that AWS saves the report in. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStackProps.property.refreshClosedReports">refreshClosedReports</a></code> | <code>boolean \| aws-cdk-lib.IResolvable</code> | Whether you want AWS to update your reports after they have been finalized if AWS detects charges related to previous months. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStackProps.property.reportVersioning">reportVersioning</a></code> | <code>string</code> | Whether you want AWS to overwrite the previous version of each report or to deliver the report in addition to the previous versions. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStackProps.property.s3Prefix">s3Prefix</a></code> | <code>string</code> | The prefix that AWS adds to the report name when AWS delivers the report. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStackProps.property.timeUnit">timeUnit</a></code> | <code>string</code> | The length of time covered by the report. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStackProps.property.reportName">reportName</a></code> | <code>string</code> | The name of the report that you want to create. |
| <code><a href="#@cloudparing/aws-cdk-lib.CurStackProps.property.s3Bucket">s3Bucket</a></code> | <code>aws-cdk-lib.aws_s3.IBucket</code> | The S3 bucket where AWS delivers the report - defaults to a new bucket named `cur-${ACCOUNT_ID}-${REGION}`    Length Constraints: Maximum length of 256. |

---

##### `analyticsReporting`<sup>Optional</sup> <a name="analyticsReporting" id="@cloudparing/aws-cdk-lib.CurStackProps.property.analyticsReporting"></a>

```typescript
public readonly analyticsReporting: boolean;
```

- *Type:* boolean
- *Default:* `analyticsReporting` setting of containing `App`, or value of 'aws:cdk:version-reporting' context key

Include runtime versioning information in this Stack.

---

##### `crossRegionReferences`<sup>Optional</sup> <a name="crossRegionReferences" id="@cloudparing/aws-cdk-lib.CurStackProps.property.crossRegionReferences"></a>

```typescript
public readonly crossRegionReferences: boolean;
```

- *Type:* boolean
- *Default:* false

Enable this flag to allow native cross region stack references.

Enabling this will create a CloudFormation custom resource
in both the producing stack and consuming stack in order to perform the export/import

This feature is currently experimental

---

##### `description`<sup>Optional</sup> <a name="description" id="@cloudparing/aws-cdk-lib.CurStackProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* No description.

A description of the stack.

---

##### `env`<sup>Optional</sup> <a name="env" id="@cloudparing/aws-cdk-lib.CurStackProps.property.env"></a>

```typescript
public readonly env: Environment;
```

- *Type:* aws-cdk-lib.Environment
- *Default:* The environment of the containing `Stage` if available, otherwise create the stack will be environment-agnostic.

The AWS environment (account/region) where this stack will be deployed.

Set the `region`/`account` fields of `env` to either a concrete value to
select the indicated environment (recommended for production stacks), or to
the values of environment variables
`CDK_DEFAULT_REGION`/`CDK_DEFAULT_ACCOUNT` to let the target environment
depend on the AWS credentials/configuration that the CDK CLI is executed
under (recommended for development stacks).

If the `Stack` is instantiated inside a `Stage`, any undefined
`region`/`account` fields from `env` will default to the same field on the
encompassing `Stage`, if configured there.

If either `region` or `account` are not set nor inherited from `Stage`, the
Stack will be considered "*environment-agnostic*"". Environment-agnostic
stacks can be deployed to any environment but may not be able to take
advantage of all features of the CDK. For example, they will not be able to
use environmental context lookups such as `ec2.Vpc.fromLookup` and will not
automatically translate Service Principals to the right format based on the
environment's AWS partition, and other such enhancements.

---

*Example*

```typescript
// Use a concrete account and region to deploy this stack to:
// `.account` and `.region` will simply return these values.
new Stack(app, 'Stack1', {
  env: {
    account: '123456789012',
    region: 'us-east-1'
  },
});

// Use the CLI's current credentials to determine the target environment:
// `.account` and `.region` will reflect the account+region the CLI
// is configured to use (based on the user CLI credentials)
new Stack(app, 'Stack2', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  },
});

// Define multiple stacks stage associated with an environment
const myStage = new Stage(app, 'MyStage', {
  env: {
    account: '123456789012',
    region: 'us-east-1'
  }
});

// both of these stacks will use the stage's account/region:
// `.account` and `.region` will resolve to the concrete values as above
new MyStack(myStage, 'Stack1');
new YourStack(myStage, 'Stack2');

// Define an environment-agnostic stack:
// `.account` and `.region` will resolve to `{ "Ref": "AWS::AccountId" }` and `{ "Ref": "AWS::Region" }` respectively.
// which will only resolve to actual values by CloudFormation during deployment.
new MyStack(app, 'Stack1');
```


##### `permissionsBoundary`<sup>Optional</sup> <a name="permissionsBoundary" id="@cloudparing/aws-cdk-lib.CurStackProps.property.permissionsBoundary"></a>

```typescript
public readonly permissionsBoundary: PermissionsBoundary;
```

- *Type:* aws-cdk-lib.PermissionsBoundary
- *Default:* no permissions boundary is applied

Options for applying a permissions boundary to all IAM Roles and Users created within this Stage.

---

##### `stackName`<sup>Optional</sup> <a name="stackName" id="@cloudparing/aws-cdk-lib.CurStackProps.property.stackName"></a>

```typescript
public readonly stackName: string;
```

- *Type:* string
- *Default:* Derived from construct path.

Name to deploy the stack with.

---

##### `suppressTemplateIndentation`<sup>Optional</sup> <a name="suppressTemplateIndentation" id="@cloudparing/aws-cdk-lib.CurStackProps.property.suppressTemplateIndentation"></a>

```typescript
public readonly suppressTemplateIndentation: boolean;
```

- *Type:* boolean
- *Default:* the value of `@aws-cdk/core:suppressTemplateIndentation`, or `false` if that is not set.

Enable this flag to suppress indentation in generated CloudFormation templates.

If not specified, the value of the `@aws-cdk/core:suppressTemplateIndentation`
context key will be used. If that is not specified, then the
default value `false` will be used.

---

##### `synthesizer`<sup>Optional</sup> <a name="synthesizer" id="@cloudparing/aws-cdk-lib.CurStackProps.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer
- *Default:* The synthesizer specified on `App`, or `DefaultStackSynthesizer` otherwise.

Synthesis method to use while deploying this stack.

The Stack Synthesizer controls aspects of synthesis and deployment,
like how assets are referenced and what IAM roles to use. For more
information, see the README of the main CDK package.

If not specified, the `defaultStackSynthesizer` from `App` will be used.
If that is not specified, `DefaultStackSynthesizer` is used if
`@aws-cdk/core:newStyleStackSynthesis` is set to `true` or the CDK major
version is v2. In CDK v1 `LegacyStackSynthesizer` is the default if no
other synthesizer is specified.

---

##### `tags`<sup>Optional</sup> <a name="tags" id="@cloudparing/aws-cdk-lib.CurStackProps.property.tags"></a>

```typescript
public readonly tags: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* {}

Stack tags that will be applied to all the taggable resources and the stack itself.

---

##### `terminationProtection`<sup>Optional</sup> <a name="terminationProtection" id="@cloudparing/aws-cdk-lib.CurStackProps.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean
- *Default:* false

Whether to enable termination protection for this stack.

---

##### `additionalArtifacts`<sup>Optional</sup> <a name="additionalArtifacts" id="@cloudparing/aws-cdk-lib.CurStackProps.property.additionalArtifacts"></a>

```typescript
public readonly additionalArtifacts: string[];
```

- *Type:* string[]
- *Default:* no additional artifacts

A list of manifests that you want Amazon Web Services to create for this report.

---

##### `additionalSchemaElements`<sup>Optional</sup> <a name="additionalSchemaElements" id="@cloudparing/aws-cdk-lib.CurStackProps.property.additionalSchemaElements"></a>

```typescript
public readonly additionalSchemaElements: string[];
```

- *Type:* string[]
- *Default:* no additional schema elements

A list of strings that indicate additional content that Amazon Web Services includes in the report, such as individual resource IDs.

---

##### `billingViewArn`<sup>Optional</sup> <a name="billingViewArn" id="@cloudparing/aws-cdk-lib.CurStackProps.property.billingViewArn"></a>

```typescript
public readonly billingViewArn: string;
```

- *Type:* string
- *Default:* no billing view ARN

The Amazon Resource Name (ARN) of the billing view.

---

##### `compression`<sup>Optional</sup> <a name="compression" id="@cloudparing/aws-cdk-lib.CurStackProps.property.compression"></a>

```typescript
public readonly compression: string;
```

- *Type:* string
- *Default:* GZIP

The compression format that Amazon Web Services uses for the report.

---

##### `format`<sup>Optional</sup> <a name="format" id="@cloudparing/aws-cdk-lib.CurStackProps.property.format"></a>

```typescript
public readonly format: string;
```

- *Type:* string
- *Default:* textORcsv

The format that AWS saves the report in.

---

##### `refreshClosedReports`<sup>Optional</sup> <a name="refreshClosedReports" id="@cloudparing/aws-cdk-lib.CurStackProps.property.refreshClosedReports"></a>

```typescript
public readonly refreshClosedReports: boolean | IResolvable;
```

- *Type:* boolean | aws-cdk-lib.IResolvable
- *Default:* true

Whether you want AWS to update your reports after they have been finalized if AWS detects charges related to previous months.

These charges can include refunds,
credits, or support fees.

---

##### `reportVersioning`<sup>Optional</sup> <a name="reportVersioning" id="@cloudparing/aws-cdk-lib.CurStackProps.property.reportVersioning"></a>

```typescript
public readonly reportVersioning: string;
```

- *Type:* string
- *Default:* OVERWRITE_REPORT

Whether you want AWS to overwrite the previous version of each report or to deliver the report in addition to the previous versions.

---

##### `s3Prefix`<sup>Optional</sup> <a name="s3Prefix" id="@cloudparing/aws-cdk-lib.CurStackProps.property.s3Prefix"></a>

```typescript
public readonly s3Prefix: string;
```

- *Type:* string
- *Default:* ""

The prefix that AWS adds to the report name when AWS delivers the report.

Your prefix can't include spaces.
   Length Constraints: Maximum length of 256.
   Pattern: [A-Za-z0-9_\.\-]*

---

##### `timeUnit`<sup>Optional</sup> <a name="timeUnit" id="@cloudparing/aws-cdk-lib.CurStackProps.property.timeUnit"></a>

```typescript
public readonly timeUnit: string;
```

- *Type:* string
- *Default:* DAILY

The length of time covered by the report.

---

##### `reportName`<sup>Required</sup> <a name="reportName" id="@cloudparing/aws-cdk-lib.CurStackProps.property.reportName"></a>

```typescript
public readonly reportName: string;
```

- *Type:* string

The name of the report that you want to create.

The name must be unique, is case sensitive, and can't include spaces.

---

##### `s3Bucket`<sup>Optional</sup> <a name="s3Bucket" id="@cloudparing/aws-cdk-lib.CurStackProps.property.s3Bucket"></a>

```typescript
public readonly s3Bucket: IBucket;
```

- *Type:* aws-cdk-lib.aws_s3.IBucket

The S3 bucket where AWS delivers the report - defaults to a new bucket named `cur-${ACCOUNT_ID}-${REGION}`    Length Constraints: Maximum length of 256.

Pattern: [A-Za-z0-9_\.\-]+

---

### DataExportDefinitionProps <a name="DataExportDefinitionProps" id="@cloudparing/aws-cdk-lib.DataExportDefinitionProps"></a>

#### Initializer <a name="Initializer" id="@cloudparing/aws-cdk-lib.DataExportDefinitionProps.Initializer"></a>

```typescript
import { DataExportDefinitionProps } from '@cloudparing/aws-cdk-lib'

const dataExportDefinitionProps: DataExportDefinitionProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cloudparing/aws-cdk-lib.DataExportDefinitionProps.property.description">description</a></code> | <code>string</code> | The description for this specific data export. |
| <code><a href="#@cloudparing/aws-cdk-lib.DataExportDefinitionProps.property.name">name</a></code> | <code>string</code> | The name of this specific data export. |
| <code><a href="#@cloudparing/aws-cdk-lib.DataExportDefinitionProps.property.bucket">bucket</a></code> | <code>aws-cdk-lib.aws_s3.IBucket</code> | The S3 bucket where your data export will be stored. |
| <code><a href="#@cloudparing/aws-cdk-lib.DataExportDefinitionProps.property.s3Prefix">s3Prefix</a></code> | <code>string</code> | The prefix that AWS adds to the report name when AWS delivers the report. |
| <code><a href="#@cloudparing/aws-cdk-lib.DataExportDefinitionProps.property.properties">properties</a></code> | <code>{[ key: string ]: any}</code> | Properties to pass to the Lambda. |

---

##### `description`<sup>Optional</sup> <a name="description" id="@cloudparing/aws-cdk-lib.DataExportDefinitionProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

The description for this specific data export.

---

##### `name`<sup>Optional</sup> <a name="name" id="@cloudparing/aws-cdk-lib.DataExportDefinitionProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of this specific data export.

---

##### `bucket`<sup>Required</sup> <a name="bucket" id="@cloudparing/aws-cdk-lib.DataExportDefinitionProps.property.bucket"></a>

```typescript
public readonly bucket: IBucket;
```

- *Type:* aws-cdk-lib.aws_s3.IBucket

The S3 bucket where your data export will be stored.

Length Constraints: Maximum length of 256.
   Pattern: [A-Za-z0-9_\.\-]+

---

##### `s3Prefix`<sup>Optional</sup> <a name="s3Prefix" id="@cloudparing/aws-cdk-lib.DataExportDefinitionProps.property.s3Prefix"></a>

```typescript
public readonly s3Prefix: string;
```

- *Type:* string
- *Default:* ""

The prefix that AWS adds to the report name when AWS delivers the report.

Your prefix can't include spaces.
   Length Constraints: Maximum length of 256.
   Pattern: [A-Za-z0-9_\.\-]*

---

##### `properties`<sup>Optional</sup> <a name="properties" id="@cloudparing/aws-cdk-lib.DataExportDefinitionProps.property.properties"></a>

```typescript
public readonly properties: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}
- *Default:* No properties.

Properties to pass to the Lambda.

---

### DataExportStorageOptions <a name="DataExportStorageOptions" id="@cloudparing/aws-cdk-lib.DataExportStorageOptions"></a>

#### Initializer <a name="Initializer" id="@cloudparing/aws-cdk-lib.DataExportStorageOptions.Initializer"></a>

```typescript
import { DataExportStorageOptions } from '@cloudparing/aws-cdk-lib'

const dataExportStorageOptions: DataExportStorageOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cloudparing/aws-cdk-lib.DataExportStorageOptions.property.bucket">bucket</a></code> | <code>aws-cdk-lib.aws_s3.IBucket</code> | The S3 bucket where your data export will be stored. |
| <code><a href="#@cloudparing/aws-cdk-lib.DataExportStorageOptions.property.s3Prefix">s3Prefix</a></code> | <code>string</code> | The prefix that AWS adds to the report name when AWS delivers the report. |

---

##### `bucket`<sup>Required</sup> <a name="bucket" id="@cloudparing/aws-cdk-lib.DataExportStorageOptions.property.bucket"></a>

```typescript
public readonly bucket: IBucket;
```

- *Type:* aws-cdk-lib.aws_s3.IBucket

The S3 bucket where your data export will be stored.

Length Constraints: Maximum length of 256.
   Pattern: [A-Za-z0-9_\.\-]+

---

##### `s3Prefix`<sup>Optional</sup> <a name="s3Prefix" id="@cloudparing/aws-cdk-lib.DataExportStorageOptions.property.s3Prefix"></a>

```typescript
public readonly s3Prefix: string;
```

- *Type:* string
- *Default:* ""

The prefix that AWS adds to the report name when AWS delivers the report.

Your prefix can't include spaces.
   Length Constraints: Maximum length of 256.
   Pattern: [A-Za-z0-9_\.\-]*

---

### ReportDefinitionOptions <a name="ReportDefinitionOptions" id="@cloudparing/aws-cdk-lib.ReportDefinitionOptions"></a>

#### Initializer <a name="Initializer" id="@cloudparing/aws-cdk-lib.ReportDefinitionOptions.Initializer"></a>

```typescript
import { ReportDefinitionOptions } from '@cloudparing/aws-cdk-lib'

const reportDefinitionOptions: ReportDefinitionOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cloudparing/aws-cdk-lib.ReportDefinitionOptions.property.additionalArtifacts">additionalArtifacts</a></code> | <code>string[]</code> | A list of manifests that you want Amazon Web Services to create for this report. |
| <code><a href="#@cloudparing/aws-cdk-lib.ReportDefinitionOptions.property.additionalSchemaElements">additionalSchemaElements</a></code> | <code>string[]</code> | A list of strings that indicate additional content that Amazon Web Services includes in the report, such as individual resource IDs. |
| <code><a href="#@cloudparing/aws-cdk-lib.ReportDefinitionOptions.property.billingViewArn">billingViewArn</a></code> | <code>string</code> | The Amazon Resource Name (ARN) of the billing view. |
| <code><a href="#@cloudparing/aws-cdk-lib.ReportDefinitionOptions.property.compression">compression</a></code> | <code>string</code> | The compression format that Amazon Web Services uses for the report. |
| <code><a href="#@cloudparing/aws-cdk-lib.ReportDefinitionOptions.property.format">format</a></code> | <code>string</code> | The format that AWS saves the report in. |
| <code><a href="#@cloudparing/aws-cdk-lib.ReportDefinitionOptions.property.refreshClosedReports">refreshClosedReports</a></code> | <code>boolean \| aws-cdk-lib.IResolvable</code> | Whether you want AWS to update your reports after they have been finalized if AWS detects charges related to previous months. |
| <code><a href="#@cloudparing/aws-cdk-lib.ReportDefinitionOptions.property.reportVersioning">reportVersioning</a></code> | <code>string</code> | Whether you want AWS to overwrite the previous version of each report or to deliver the report in addition to the previous versions. |
| <code><a href="#@cloudparing/aws-cdk-lib.ReportDefinitionOptions.property.s3Prefix">s3Prefix</a></code> | <code>string</code> | The prefix that AWS adds to the report name when AWS delivers the report. |
| <code><a href="#@cloudparing/aws-cdk-lib.ReportDefinitionOptions.property.timeUnit">timeUnit</a></code> | <code>string</code> | The length of time covered by the report. |

---

##### `additionalArtifacts`<sup>Optional</sup> <a name="additionalArtifacts" id="@cloudparing/aws-cdk-lib.ReportDefinitionOptions.property.additionalArtifacts"></a>

```typescript
public readonly additionalArtifacts: string[];
```

- *Type:* string[]
- *Default:* no additional artifacts

A list of manifests that you want Amazon Web Services to create for this report.

---

##### `additionalSchemaElements`<sup>Optional</sup> <a name="additionalSchemaElements" id="@cloudparing/aws-cdk-lib.ReportDefinitionOptions.property.additionalSchemaElements"></a>

```typescript
public readonly additionalSchemaElements: string[];
```

- *Type:* string[]
- *Default:* no additional schema elements

A list of strings that indicate additional content that Amazon Web Services includes in the report, such as individual resource IDs.

---

##### `billingViewArn`<sup>Optional</sup> <a name="billingViewArn" id="@cloudparing/aws-cdk-lib.ReportDefinitionOptions.property.billingViewArn"></a>

```typescript
public readonly billingViewArn: string;
```

- *Type:* string
- *Default:* no billing view ARN

The Amazon Resource Name (ARN) of the billing view.

---

##### `compression`<sup>Optional</sup> <a name="compression" id="@cloudparing/aws-cdk-lib.ReportDefinitionOptions.property.compression"></a>

```typescript
public readonly compression: string;
```

- *Type:* string
- *Default:* GZIP

The compression format that Amazon Web Services uses for the report.

---

##### `format`<sup>Optional</sup> <a name="format" id="@cloudparing/aws-cdk-lib.ReportDefinitionOptions.property.format"></a>

```typescript
public readonly format: string;
```

- *Type:* string
- *Default:* textORcsv

The format that AWS saves the report in.

---

##### `refreshClosedReports`<sup>Optional</sup> <a name="refreshClosedReports" id="@cloudparing/aws-cdk-lib.ReportDefinitionOptions.property.refreshClosedReports"></a>

```typescript
public readonly refreshClosedReports: boolean | IResolvable;
```

- *Type:* boolean | aws-cdk-lib.IResolvable
- *Default:* true

Whether you want AWS to update your reports after they have been finalized if AWS detects charges related to previous months.

These charges can include refunds,
credits, or support fees.

---

##### `reportVersioning`<sup>Optional</sup> <a name="reportVersioning" id="@cloudparing/aws-cdk-lib.ReportDefinitionOptions.property.reportVersioning"></a>

```typescript
public readonly reportVersioning: string;
```

- *Type:* string
- *Default:* OVERWRITE_REPORT

Whether you want AWS to overwrite the previous version of each report or to deliver the report in addition to the previous versions.

---

##### `s3Prefix`<sup>Optional</sup> <a name="s3Prefix" id="@cloudparing/aws-cdk-lib.ReportDefinitionOptions.property.s3Prefix"></a>

```typescript
public readonly s3Prefix: string;
```

- *Type:* string
- *Default:* ""

The prefix that AWS adds to the report name when AWS delivers the report.

Your prefix can't include spaces.
   Length Constraints: Maximum length of 256.
   Pattern: [A-Za-z0-9_\.\-]*

---

##### `timeUnit`<sup>Optional</sup> <a name="timeUnit" id="@cloudparing/aws-cdk-lib.ReportDefinitionOptions.property.timeUnit"></a>

```typescript
public readonly timeUnit: string;
```

- *Type:* string
- *Default:* DAILY

The length of time covered by the report.

---

### ReportDefinitionProps <a name="ReportDefinitionProps" id="@cloudparing/aws-cdk-lib.ReportDefinitionProps"></a>

#### Initializer <a name="Initializer" id="@cloudparing/aws-cdk-lib.ReportDefinitionProps.Initializer"></a>

```typescript
import { ReportDefinitionProps } from '@cloudparing/aws-cdk-lib'

const reportDefinitionProps: ReportDefinitionProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cloudparing/aws-cdk-lib.ReportDefinitionProps.property.additionalArtifacts">additionalArtifacts</a></code> | <code>string[]</code> | A list of manifests that you want Amazon Web Services to create for this report. |
| <code><a href="#@cloudparing/aws-cdk-lib.ReportDefinitionProps.property.additionalSchemaElements">additionalSchemaElements</a></code> | <code>string[]</code> | A list of strings that indicate additional content that Amazon Web Services includes in the report, such as individual resource IDs. |
| <code><a href="#@cloudparing/aws-cdk-lib.ReportDefinitionProps.property.billingViewArn">billingViewArn</a></code> | <code>string</code> | The Amazon Resource Name (ARN) of the billing view. |
| <code><a href="#@cloudparing/aws-cdk-lib.ReportDefinitionProps.property.compression">compression</a></code> | <code>string</code> | The compression format that Amazon Web Services uses for the report. |
| <code><a href="#@cloudparing/aws-cdk-lib.ReportDefinitionProps.property.format">format</a></code> | <code>string</code> | The format that AWS saves the report in. |
| <code><a href="#@cloudparing/aws-cdk-lib.ReportDefinitionProps.property.refreshClosedReports">refreshClosedReports</a></code> | <code>boolean \| aws-cdk-lib.IResolvable</code> | Whether you want AWS to update your reports after they have been finalized if AWS detects charges related to previous months. |
| <code><a href="#@cloudparing/aws-cdk-lib.ReportDefinitionProps.property.reportVersioning">reportVersioning</a></code> | <code>string</code> | Whether you want AWS to overwrite the previous version of each report or to deliver the report in addition to the previous versions. |
| <code><a href="#@cloudparing/aws-cdk-lib.ReportDefinitionProps.property.s3Prefix">s3Prefix</a></code> | <code>string</code> | The prefix that AWS adds to the report name when AWS delivers the report. |
| <code><a href="#@cloudparing/aws-cdk-lib.ReportDefinitionProps.property.timeUnit">timeUnit</a></code> | <code>string</code> | The length of time covered by the report. |
| <code><a href="#@cloudparing/aws-cdk-lib.ReportDefinitionProps.property.reportName">reportName</a></code> | <code>string</code> | The name of the report that you want to create. |
| <code><a href="#@cloudparing/aws-cdk-lib.ReportDefinitionProps.property.s3Bucket">s3Bucket</a></code> | <code>aws-cdk-lib.aws_s3.IBucket</code> | The S3 bucket where AWS delivers the report. |

---

##### `additionalArtifacts`<sup>Optional</sup> <a name="additionalArtifacts" id="@cloudparing/aws-cdk-lib.ReportDefinitionProps.property.additionalArtifacts"></a>

```typescript
public readonly additionalArtifacts: string[];
```

- *Type:* string[]
- *Default:* no additional artifacts

A list of manifests that you want Amazon Web Services to create for this report.

---

##### `additionalSchemaElements`<sup>Optional</sup> <a name="additionalSchemaElements" id="@cloudparing/aws-cdk-lib.ReportDefinitionProps.property.additionalSchemaElements"></a>

```typescript
public readonly additionalSchemaElements: string[];
```

- *Type:* string[]
- *Default:* no additional schema elements

A list of strings that indicate additional content that Amazon Web Services includes in the report, such as individual resource IDs.

---

##### `billingViewArn`<sup>Optional</sup> <a name="billingViewArn" id="@cloudparing/aws-cdk-lib.ReportDefinitionProps.property.billingViewArn"></a>

```typescript
public readonly billingViewArn: string;
```

- *Type:* string
- *Default:* no billing view ARN

The Amazon Resource Name (ARN) of the billing view.

---

##### `compression`<sup>Optional</sup> <a name="compression" id="@cloudparing/aws-cdk-lib.ReportDefinitionProps.property.compression"></a>

```typescript
public readonly compression: string;
```

- *Type:* string
- *Default:* GZIP

The compression format that Amazon Web Services uses for the report.

---

##### `format`<sup>Optional</sup> <a name="format" id="@cloudparing/aws-cdk-lib.ReportDefinitionProps.property.format"></a>

```typescript
public readonly format: string;
```

- *Type:* string
- *Default:* textORcsv

The format that AWS saves the report in.

---

##### `refreshClosedReports`<sup>Optional</sup> <a name="refreshClosedReports" id="@cloudparing/aws-cdk-lib.ReportDefinitionProps.property.refreshClosedReports"></a>

```typescript
public readonly refreshClosedReports: boolean | IResolvable;
```

- *Type:* boolean | aws-cdk-lib.IResolvable
- *Default:* true

Whether you want AWS to update your reports after they have been finalized if AWS detects charges related to previous months.

These charges can include refunds,
credits, or support fees.

---

##### `reportVersioning`<sup>Optional</sup> <a name="reportVersioning" id="@cloudparing/aws-cdk-lib.ReportDefinitionProps.property.reportVersioning"></a>

```typescript
public readonly reportVersioning: string;
```

- *Type:* string
- *Default:* OVERWRITE_REPORT

Whether you want AWS to overwrite the previous version of each report or to deliver the report in addition to the previous versions.

---

##### `s3Prefix`<sup>Optional</sup> <a name="s3Prefix" id="@cloudparing/aws-cdk-lib.ReportDefinitionProps.property.s3Prefix"></a>

```typescript
public readonly s3Prefix: string;
```

- *Type:* string
- *Default:* ""

The prefix that AWS adds to the report name when AWS delivers the report.

Your prefix can't include spaces.
   Length Constraints: Maximum length of 256.
   Pattern: [A-Za-z0-9_\.\-]*

---

##### `timeUnit`<sup>Optional</sup> <a name="timeUnit" id="@cloudparing/aws-cdk-lib.ReportDefinitionProps.property.timeUnit"></a>

```typescript
public readonly timeUnit: string;
```

- *Type:* string
- *Default:* DAILY

The length of time covered by the report.

---

##### `reportName`<sup>Required</sup> <a name="reportName" id="@cloudparing/aws-cdk-lib.ReportDefinitionProps.property.reportName"></a>

```typescript
public readonly reportName: string;
```

- *Type:* string

The name of the report that you want to create.

The name must be unique, is case sensitive, and can't include spaces.

---

##### `s3Bucket`<sup>Required</sup> <a name="s3Bucket" id="@cloudparing/aws-cdk-lib.ReportDefinitionProps.property.s3Bucket"></a>

```typescript
public readonly s3Bucket: IBucket;
```

- *Type:* aws-cdk-lib.aws_s3.IBucket

The S3 bucket where AWS delivers the report.

Length Constraints: Maximum length of 256.
   Pattern: [A-Za-z0-9_\.\-]+

---



