import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schema/order.schema';
import { Model } from 'mongoose';
import { UpsertOrderDto } from './dto/order-upsert.dto';

@Injectable()
export class OrdersService {

  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<Order>,
  ) { }

  async upsertOrder(dto: UpsertOrderDto) {
    const orderId = dto.order_id || `order_${Date.now()}`;

    const order = await this.orderModel.findOneAndUpdate(
      { customer_id: dto.customer_id, staff_id: dto.staff_id, order_id: orderId },
      {
        $set: {
          ...dto,
          order_id: orderId,
        },
      },
      { new: true, upsert: true }
    ).lean().exec();

    return {
      status: 200,
      message: 'Upserted order successfully.',
      errors: null,
      data: {
        order,
      },
    };
  }

  async getOrderByCustomerId(customerId: string) {
    const order = await this.orderModel.find({
      customer_id: customerId,
    })
      .lean()
      .exec();

    return {
      status: 200,
      message: 'Fetched orders successfully.',
      errors: null,
      data: {
        order,
      },
    };
  }
  async getOrderById(id: string) {
    const order = await this.orderModel.findOne({ order_id: id })
      .lean()
      .exec();

    return {
      status: 200,
      message: 'Fetched order successfully.',
      errors: null,
      data: {
        order,
      },
    };
  }

  async getAllOrders(limit: number, page: number) {
    const skip = (page - 1) * limit;

    const [order, total] = await Promise.all([
      this.orderModel.find()
        .skip(skip)
        .limit(limit)
        .sort({ created_time: -1 })
        .lean()
        .exec(),
      this.orderModel.countDocuments().exec(),
    ]);

    return {
      status: 200,
      message: 'Fetched orders successfully.',
      errors: null,
      data: {
        order,
        meta: {
          totalItems: total,
          itemCount: order.length,
          itemsPerPage: limit,
          totalPages: Math.ceil(total / limit),
          currentPage: page,
        },
      },

    };
  }
  async getOrderByStaffId(staffId: string) {
    const order = await this.orderModel.find({
      staff_id: staffId,
    })
      .lean()
      .exec();

    return {
      status: 200,
      message: 'Fetched orders successfully.',
      errors: null,
      data: {
        order,
      },
    };
  }
  async getOrderByTableId(tableId: number) {
    const order = await this.orderModel.find({
      'tables.table_id': tableId,
    })
      .lean()
      .exec();

    return {
      status: 200,
      message: 'Fetched orders successfully.',
      errors: null,
      data: {
        order,
      },
    };
  }
  async deleteOrder(id: string) {
    await this.orderModel.findOneAndDelete({ order_id: id })
      .lean()
      .exec();

    return {
      status: 200,
      message: 'Deleted order successfully.',
      errors: null,
      data: null
    };
  }

}
