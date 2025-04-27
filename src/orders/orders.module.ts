import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schema/order.schema';

@Module({
  providers: [OrdersService],
  controllers: [OrdersController],
  imports: [
    MongooseModule.forFeature([{
      name: Order.name, schema: OrderSchema
    }])
  ]
})
export class OrdersModule { }
