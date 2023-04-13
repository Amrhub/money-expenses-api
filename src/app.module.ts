import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { AuthzModule } from './authz/authz.module';
import { ReceiptsModule } from './receipts/receipts.module';

@Module({
  imports: [ProductsModule, AuthzModule, ReceiptsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
