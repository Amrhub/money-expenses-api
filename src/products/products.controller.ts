import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/authz/clerk/auth.decorator';
import { User } from 'src/authz/clerk/user.decorator';
import { PaginationDto } from 'src/shared/dto/Pagination.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsResponseDto } from './dto/get-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller('products')
@Auth()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiBody({ type: CreateProductDto, required: true })
  create(@Body() createProductDto: CreateProductDto, @User('id') userId) {
    return this.productsService.create({
      ...createProductDto,
      userId,
    });
  }

  @Get()
  @ApiOkResponse({
    type: () => GetProductsResponseDto,
  })
  findAll(@User('id') userId, @Query() pagination: PaginationDto) {
    return this.productsService.findAll(userId, pagination);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateProductDto, required: true })
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @User('id') userId,
  ) {
    return this.productsService.update(+id, {
      ...updateProductDto,
      userId,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User('id') userId) {
    return this.productsService.remove(+id, userId);
  }
}
