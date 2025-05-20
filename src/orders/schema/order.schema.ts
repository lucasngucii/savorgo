import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export enum OrderStatus {
  PENDING = 'PENDING',
  PREPARING = 'PREPARING',
  READY = 'READY',
  DELIVERED = 'DELIVERED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}
export enum PaymentMethod {
  CASH = 'CASH',
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  E_WALLET = 'E_WALLET',
  BANK_TRANSFER = 'BANK_TRANSFER'
}



export class Size {
  @Prop({ required: true })
  size_name: string;

  @Prop({ required: true, default: 0 })
  price_change: number;
}

// Option class
export class Option {
  @Prop({ required: true })
  option_name: string;

  @Prop({ required: true, default: 0 })
  price_change: number;
}


export class OrderItem {
  @Prop({ required: true })
  item_id: string;

  @Prop({ type: Size, required: true })
  size: Size;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, min: 1, default: 1 })
  quantity: number;

  @Prop({ type: [Option], default: [] })
  options: Option[];

  @Prop()
  discounted_price: number;
}


export class TableReference {
  @Prop({ required: true })
  table_id: number;
}


// Main Order Schema
@Schema({
  collection: 'order',
  versionKey: false,
})
export class Order extends Document {
  @Prop({ required: true, unique: true, index: true })
  order_id: string;

  @Prop({ required: true, index: true })
  customer_id: string;

  @Prop({ required: true, index: true })
  staff_id: string;

  @Prop()
  delivery_address: string;

  @Prop({ required: true, type: Date, default: Date.now, index: true })
  order_time: Date;

  @Prop({ type: [OrderItem], default: [] })
  items: OrderItem[];

  @Prop({ type: [TableReference], default: [] })
  tables: TableReference[];

  @Prop({ type: String, enum: PaymentMethod, default: PaymentMethod.CASH })
  payment_method: string;
  @Prop()
  additional_requests: string;

  @Prop({ type: String, default: null })
  payment_transaction_id: string;

  @Prop({
    required: true,
    enum: OrderStatus,
    default: OrderStatus.PENDING,
    index: true
  })
  status: string;

  @Prop({ type: Date, default: Date.now })
  created_time: Date;

  @Prop({ type: Date, default: Date.now })
  modified_time: Date;


}

export const OrderSchema = SchemaFactory.createForClass(Order);
