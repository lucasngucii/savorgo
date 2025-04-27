import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpsertOrderDto } from './dto/order-upsert.dto';
import { OrdersService } from './orders.service';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly service: OrdersService) { }

  @ApiCreatedResponse({ type: UpsertOrderDto })
  @Post('upsert')
  async upsertOrder(@Body() dto: UpsertOrderDto) {
    return this.service.upsertOrder(dto);
  }

  @ApiOkResponse({ description: 'Get order by customer id' })
  @ApiResponse({ description: 'Get order by customer id', type: UpsertOrderDto })
  @ApiParam({ name: 'id', required: true, type: String, })
  @Get('customer/:id')
  async getOrderByCustomerId(@Param('id') customerId: string) {
    return this.service.getOrderByCustomerId(customerId);
  }

  @ApiOkResponse({ description: 'Get staff by id' })
  @ApiResponse({ description: 'Get order by id', type: UpsertOrderDto })
  @ApiParam({ name: 'order_id', required: true, type: String, })
  @Get(':order_id')
  async getOrderById(@Param('order_id') id: string) {
    return this.service.getOrderById(id);
  }

  @ApiOkResponse({ description: 'Get order by table id' })
  @ApiParam({ name: 'table_id', required: true, type: String, })
  @Get('table/:table_id')
  async getOrderByTableId(@Param('table_id') tableId: number) {
    return this.service.getOrderByTableId(tableId);
  }

  @ApiParam({ name: 'staff_id', required: true, type: String, })
  @ApiOkResponse({ description: 'Get order by staff id' })
  @ApiResponse({ description: 'Get order by staff id', type: UpsertOrderDto })
  @ApiOkResponse({ description: 'Get order by staff id' })
  @Get('staff/:staff_id')
  async getOrderByStaffId(@Param('staff_id') staffId: string) {
    return this.service.getOrderByStaffId(staffId);
  }


  @ApiOkResponse({ description: 'Get all orders' })
  @ApiResponse({ description: 'Get all order', type: UpsertOrderDto })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @Get()
  async getAllOrders(
    @Query('limit') limit = 10,
    @Query('page') page = 1,
  ) {
    return this.service.getAllOrders(Number(limit), Number(page));
  }


  @ApiResponse({ description: 'delete order by id (Cân nhăc khi sử dụng)' })
  @ApiParam({ name: 'order_id', required: true, type: String, })
  @Delete(':order_id')
  async deleteOrderById(@Param('order_id') id: string) {
    return this.service.deleteOrder(id);
  }

}
