import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { OrderService } from './orders.service';
import { OrderDto } from './dto/orders.dto';
import type { Request } from 'express';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('orders')
  createOrder(@Body() dto: OrderDto,   @Req() req: Request) {
    return this.orderService.createOrder(dto,req['correlatioId']);
  }
}
