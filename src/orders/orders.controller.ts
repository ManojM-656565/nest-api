import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './orders.service';
import { OrderDto } from './dto/orders.dto';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('orders')
  createOrder(@Body() dto: OrderDto) {
    return this.orderService.createOrder(dto);
  }
}
