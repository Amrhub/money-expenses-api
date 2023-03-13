import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from 'src/authz/decorators/auth.decorator';
import { User } from 'src/authz/decorators/user.decorator';
import { PaginationDto } from 'src/shared/dto/Pagination.dto';

@ApiTags('products')
@Controller('products')
@Auth()
@ApiBearerAuth()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto, @User() user) {
    return this.productsService.create({
      ...createProductDto,
      userId: user.sub,
    });
  }

  @Get()
  findAll(@User() user, @Query() pagination: PaginationDto) {
    return this.productsService.findAll(user.sub, pagination);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @User() user,
  ) {
    return this.productsService.update(+id, {
      ...updateProductDto,
      userId: user.sub,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user) {
    return this.productsService.remove(+id, user.sub);
  }
}
