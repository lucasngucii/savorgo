import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { OrderStatus, PaymentMethod } from "../schema/order.schema";


export class SizeDto {
  @ApiProperty({ description: 'Size name', example: 'Large' })
  @IsString()
  size_name: string;

  @ApiProperty({ description: 'Price change', example: 10000 })
  @IsNumber()
  price_change: number;
}

export class OptionDto {
  @ApiProperty({ description: 'Option name', example: 'Extra Cheese' })
  @IsString()
  option_name: string;

  @ApiProperty({ description: 'Price change', example: 5000 })
  @IsNumber()
  price_change: number;
}

export class OrderItemDto {
  @ApiProperty({description: 'Item ID', example: 'item_123456'})
  @IsString()
  item_id: string;

  @ApiProperty({ description: 'Size information' })
  @ValidateNested()
  @Type(() => SizeDto)
  size: SizeDto;

  @ApiProperty({ description: 'Price', example: 50000 })
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'Quantity', example: 2 })
  @IsNumber()
  quantity: number;

  @ApiProperty({ description: 'Options for item', type: [OptionDto], example: [{ option_name: 'Extra Cheese', price_change: 5000 }] })
  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  @IsArray()
  options: OptionDto[];

  @ApiProperty({ description: 'Discounted price', example: 45000 })
  @IsOptional()
  @IsNumber()
  discounted_price?: number;
}

export class TableReferenceDto {
  @ApiProperty({ description: 'Table ID', example: 5 })
  @IsNumber()
  table_id: number;
}

export class UpsertOrderDto {
  @ApiProperty({ description: 'Order ID', example: 'order_123456' })
  @IsOptional()
  @IsString()
  order_id?: string;

  @ApiProperty({ description: 'Customer ID', example: 'cust_abc123' })
  @IsString()
  customer_id: string;

  @ApiProperty({ description: 'Staff ID', example: 'staff_xyz456' })
  @IsString()
  staff_id: string;

  @ApiProperty({ description: 'Delivery address', example: '123 Main Street' })
  @IsOptional()
  @IsString()
  delivery_address?: string;

  @ApiProperty({ description: 'Order time', example: '2025-04-27T15:30:00.000Z' })
  @Type(() => Date)
  order_time: Date;

  @ApiProperty({ description: 'Order items', type: [OrderItemDto] })
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  @IsArray()
  items: OrderItemDto[];

  @ApiProperty({ description: 'Tables', type: [TableReferenceDto] })
  @ValidateNested({ each: true })
  @Type(() => TableReferenceDto)
  @IsArray()
  tables: TableReferenceDto[];

  @ApiProperty({ description: 'Payment method', enum: PaymentMethod, example: PaymentMethod.CASH })
  @IsEnum(PaymentMethod)
  payment_method: PaymentMethod;

  @ApiProperty({ description: 'payment transaction id', example: 'id' })
  @IsOptional()
  @IsString()
  payment_transaction_id?: string;

  @ApiProperty({ description: 'Additional requests', example: 'No peanuts please' })
  @IsOptional()
  @IsString()
  additional_requests?: string;

  @ApiProperty({ description: 'Order status', enum: OrderStatus, example: OrderStatus.PENDING })
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
