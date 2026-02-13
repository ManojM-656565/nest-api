import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { OrderModule } from './orders/orders.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
     ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    OrderModule,
  HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
