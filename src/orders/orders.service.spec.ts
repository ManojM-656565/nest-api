import { BadRequestException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { OrderService } from "./orders.service"
import { Test, TestingModule } from "@nestjs/testing";



describe('OrderService',()=>{
    let service:OrderService;
    let prisma:PrismaService;

    const mock={
        $transaction:jest.fn(),
    };

    beforeEach(async()=>{
        const module:TestingModule=await Test.createTestingModule({
            providers:[
                OrderService,
                {provide:PrismaService,useValue:mock},
    
        ],
    }).compile();
    service = module.get<OrderService>(OrderService);
    prisma = module.get<PrismaService>(PrismaService);
    });

    it('Should create order successfully',async()=>{
        mock.$transaction.mockResolvedValue({id:'orderID-12345'});

        const result=await service.createOrder({
            userId:'2',
            items:[
                {productId:'1',quantity:1}
            ],

        } as any);
        expect(result?.id).toBe('orderID-12345')
    });

      it('should throw error if transaction fails', async () => {
    mock.$transaction.mockRejectedValue(
      new BadRequestException('Transaction fails'),
    );

    await expect(
      service.createOrder({
        userId: '1',
        items: [{ productId: '1', quantity: 5 }],
      } as any),
    ).rejects.toThrow(BadRequestException);
  });
    
})