import { Injectable, NotFoundException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { PrismaService } from 'src/services/prisma.service';
import { PaginationDto } from 'src/shared/dto/Pagination.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    return this.prismaService.product.create({
      data: createProductDto,
    });
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
    return this.prismaService.product.update({
      where: { id },
      data: updateProductDto,
    });
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
