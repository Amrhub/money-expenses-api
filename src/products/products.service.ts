import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { PaginationDto } from 'src/shared/dto/Pagination.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    try {
      return await this.prismaService.product.create({
        data: createProductDto,
      });
    } catch (error) {
      if (error.code === 'P2002')
        throw new BadRequestException('Product name already exists');

      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async findAll(userId: string, pagination: PaginationDto) {
    let products: Product[] = [];
    const count = await this.prismaService.product.count({
      where: { isDeleted: false, userId },
    });

    if (
      (pagination?.page || pagination?.page === 0) &&
      pagination?.rowsPerPage
    ) {
      const take = pagination.rowsPerPage;
      const skip = pagination.page * pagination.rowsPerPage;
      products = await this.prismaService.product.findMany({
        where: { isDeleted: false, userId },
        skip,
        take,
      });
    } else {
      products = await this.prismaService.product.findMany({
        where: { isDeleted: false, userId },
      });
    }

    return {
      products,
      count,
    };
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      return await this.prismaService.product.update({
        where: { id },
        data: updateProductDto,
      });
    } catch (error) {
      if (error.code === 'P2002')
        throw new BadRequestException('Product name already exists');

      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async remove(id: number, userId: string) {
    const product = await this.prismaService.product.findUnique({
      where: { id },
    });
    if (!product || product.userId !== userId)
      throw new NotFoundException('Product not found');

    return this.prismaService.product.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
