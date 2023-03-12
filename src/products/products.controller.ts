import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create({ ...createProductDto, userId: '1' });
  }

  @Get()
  findAll() {
    return this.productsService.findAll('1');
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, {
      ...updateProductDto,
      userId: '1',
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id, '1');
  }
}
