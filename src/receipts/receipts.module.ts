import { Module } from '@nestjs/common';
import { ProductsModule } from 'src/products/products.module';
import { ReceiptsController } from './receipts.controller';
import { ReceiptsService } from './receipts.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [ProductsModule, PrismaModule],
  controllers: [ReceiptsController],
  providers: [ReceiptsService],
})
export class ReceiptsModule {}
