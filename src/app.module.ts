import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BillsModule } from './bills/bills.module';
import { ProductsModule } from './products/products.module';
import { ReceiptsModule } from './receipts/receipts.module';

@Module({
  imports: [ProductsModule, ReceiptsModule, BillsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
