import * as cdk from 'aws-cdk-lib';
import { CustomResource, Duration } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Architecture } from 'aws-cdk-lib/aws-lambda';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Provider } from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';
import {
  Cur2ExportProps,
  DataExportDefinitionProps,
} from './data-export-definition.types';
import { DataExportFunction } from './data-export-function';

const curRegion = 'us-east-1'; // cur only available in us-east-1
export class DataExportDefinition extends Construct {
  constructor(scope: Construct, id: string, props: DataExportDefinitionProps) {
    super(scope, id);

    // Add bucket policy https://docs.aws.amazon.com/cur/latest/userguide/cur-s3.html
    const policy = this.addBucketPolicy(props.bucket);
    if (policy) {
      this.node.addDependency(policy);
    }

    const dataExportFunction = new DataExportFunction(
      this,
      'DataExportFunction',
      {
        timeout: Duration.seconds(30),
        architecture: Architecture.ARM_64,
        memorySize: 1024,
        role: new iam.Role(this, 'DataExportFunctionRole', {
          assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
          inlinePolicies: {
            BcmDataExportPolicy: new iam.PolicyDocument({
              statements: [
                new iam.PolicyStatement({
                  sid: 'CreateCurExportsInDataExports',
                  effect: iam.Effect.ALLOW,
                  actions: ['bcm-data-exports:*'],
                  resources: ['*'],
                }),
                new iam.PolicyStatement({
                  sid: 'CurDataAccess',
                  effect: iam.Effect.ALLOW,
                  actions: ['cur:PutReportDefinition'],
                  resources: ['*'],
                }),
              ],
            }),
          },
        }),
      },
    );

    const customResourceProvider = new Provider(
      this,
      'DataExportDefinitionCustomResourceProvider',
      {
        onEventHandler: dataExportFunction,
        logRetention: RetentionDays.ONE_DAY,
      },
    );

    new CustomResource(this, 'DataExportDefinitionCustomResource', {
      serviceToken: customResourceProvider.serviceToken,
      resourceType: 'Custom::DataExportDefinition',
      properties: props.properties,
    });
  }

  private addBucketPolicy(
    bucket: cdk.aws_s3.IBucket,
  ): cdk.aws_s3.BucketPolicy | undefined {
    bucket.addToResourcePolicy(
      new cdk.aws_iam.PolicyStatement({
        effect: cdk.aws_iam.Effect.ALLOW,
        actions: ['s3:PutObject', 's3:GetBucketPolicy'],
        principals: [
          new cdk.aws_iam.ServicePrincipal('billingreports.amazonaws.com'),
          new cdk.aws_iam.ServicePrincipal('bcm-data-exports.amazonaws.com'),
        ],
        resources: [bucket.bucketArn, bucket.arnForObjects('*')],
        conditions: {
          StringLike: {
            'aws:SourceArn': [
              `arn:${cdk.Aws.PARTITION}:cur:${curRegion}:${cdk.Aws.ACCOUNT_ID}:definition/*`,
              `arn:${cdk.Aws.PARTITION}:bcm-data-exports:${curRegion}:${cdk.Aws.ACCOUNT_ID}:export/*`,
            ],
            'aws:SourceAccount': `${cdk.Aws.ACCOUNT_ID}`,
          },
        },
      }),
    );

    return bucket.policy;
  }
}
export class Cur2ExportDefinition extends DataExportDefinition {
  constructor(scope: Construct, id: string, props: Cur2ExportProps) {
    super(scope, id, {
      ...props,
      properties: {
        ExportType: 'COST_AND_USAGE',
        ExportName: props.name,
        ExportDescription: props.description || '',
        S3Bucket: props.bucket.bucketName,
        S3Prefix: props.s3Prefix || '',
        S3Region: curRegion,
        TimeUnit: props.timeUnit || 'DAILY',
        CompressionFormat: props.compressionFormat || 'GZIP_CSV',
        ExportVersioning: props.exportVersioning || 'OVERWRITE_EXPORT',
        IncludeResourceIds: props.includeResourceIds || false,
        SplitCostAllocationData: props.splitCostAllocationData || false,
        SelectedColumns: props.columns || ALL_CUR_COLUMNS,
      },
    });
  }
}

export const ALL_CUR_COLUMNS = [
  'bill_bill_type',
  'bill_billing_entity',
  'bill_billing_period_end_date',
  'bill_billing_period_start_date',
  'bill_invoice_id',
  'bill_invoicing_entity',
  'bill_payer_account_id',
  'bill_payer_account_name',
  'cost_category',
  'discount',
  'discount_bundled_discount',
  'discount_total_discount',
  'identity_line_item_id',
  'identity_time_interval',
  'line_item_availability_zone',
  'line_item_blended_cost',
  'line_item_blended_rate',
  'line_item_currency_code',
  'line_item_legal_entity',
  'line_item_line_item_description',
  'line_item_line_item_type',
  'line_item_net_unblended_cost',
  'line_item_net_unblended_rate',
  'line_item_normalization_factor',
  'line_item_normalized_usage_amount',
  'line_item_operation',
  'line_item_product_code',
  'line_item_tax_type',
  'line_item_unblended_cost',
  'line_item_unblended_rate',
  'line_item_usage_account_id',
  'line_item_usage_account_name',
  'line_item_usage_amount',
  'line_item_usage_end_date',
  'line_item_usage_start_date',
  'line_item_usage_type',
  'pricing_currency',
  'pricing_lease_contract_length',
  'pricing_offering_class',
  'pricing_public_on_demand_cost',
  'pricing_public_on_demand_rate',
  'pricing_purchase_option',
  'pricing_rate_code',
  'pricing_rate_id',
  'pricing_term',
  'pricing_unit',
  'product',
  'product_comment',
  'product_fee_code',
  'product_fee_description',
  'product_from_location',
  'product_from_location_type',
  'product_from_region_code',
  'product_instance_family',
  'product_instance_type',
  'product_instancesku',
  'product_location',
  'product_location_type',
  'product_operation',
  'product_pricing_unit',
  'product_product_family',
  'product_region_code',
  'product_servicecode',
  'product_sku',
  'product_to_location',
  'product_to_location_type',
  'product_to_region_code',
  'product_usagetype',
  'reservation_amortized_upfront_cost_for_usage',
  'reservation_amortized_upfront_fee_for_billing_period',
  'reservation_availability_zone',
  'reservation_effective_cost',
  'reservation_end_time',
  'reservation_modification_status',
  'reservation_net_amortized_upfront_cost_for_usage',
  'reservation_net_amortized_upfront_fee_for_billing_period',
  'reservation_net_effective_cost',
  'reservation_net_recurring_fee_for_usage',
  'reservation_net_unused_amortized_upfront_fee_for_billing_period',
  'reservation_net_unused_recurring_fee',
  'reservation_net_upfront_value',
  'reservation_normalized_units_per_reservation',
  'reservation_number_of_reservations',
  'reservation_recurring_fee_for_usage',
  'reservation_reservation_a_r_n',
  'reservation_start_time',
  'reservation_subscription_id',
  'reservation_total_reserved_normalized_units',
  'reservation_total_reserved_units',
  'reservation_units_per_reservation',
  'reservation_unused_amortized_upfront_fee_for_billing_period',
  'reservation_unused_normalized_unit_quantity',
  'reservation_unused_quantity',
  'reservation_unused_recurring_fee',
  'reservation_upfront_value',
  'resource_tags',
  'savings_plan_amortized_upfront_commitment_for_billing_period',
  'savings_plan_end_time',
  'savings_plan_instance_type_family',
  'savings_plan_net_amortized_upfront_commitment_for_billing_period',
  'savings_plan_net_recurring_commitment_for_billing_period',
  'savings_plan_net_savings_plan_effective_cost',
  'savings_plan_offering_type',
  'savings_plan_payment_option',
  'savings_plan_purchase_term',
  'savings_plan_recurring_commitment_for_billing_period',
  'savings_plan_region',
  'savings_plan_savings_plan_a_r_n',
  'savings_plan_savings_plan_effective_cost',
  'savings_plan_savings_plan_rate',
  'savings_plan_start_time',
  'savings_plan_total_commitment_to_date',
  'savings_plan_used_commitment',
];
