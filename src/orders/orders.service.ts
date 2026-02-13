import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderDto } from './dto/orders.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}
  async createOrder(dto: OrderDto) {
    const { userId, items } = dto;
    return await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: {
          id: userId,
        },
      });
      console.log('Iam here');
      // return user;
      for (const item of items) {
        const product = await tx.product.findUnique({
          where: {
            id: String(item.productId),
          },
        });

        if (product != null) {
          if (product?.stock < item.quantity) {
            throw new BadRequestException(
              `Insufficient stock for product ${product.name}`,
            );
          }
        }
      }
      const order = await tx.order.create({
        data: {
          userId,
        },
      });

      for (const item of items) {
        const product = await tx.product.findUnique({
          where: {
            id: String(item.productId),
          },
        });
        if (!product) {
          throw new BadRequestException(`Product not found`);
        }

        await tx.orderItem.create({
          data: {
            orderId: order.id,
            productId: product?.id,
            quantity: item.quantity,
            price: product?.price,
          },
        });

        await tx.product.update({
          where: { id: product.id },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

    return tx.order.findUnique({
      where:{id:order.id},
      include:{
        orderItems:{
          include:{
            product:true,
          }
        }
      }
    })
    });
  }
}
