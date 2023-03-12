import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    return this.prismaService.product.create({
      data: createProductDto,
    });
  }

  async findAll(userId: string) {
    return this.prismaService.product.findMany({
      where: { isDeleted: false, userId },
    });
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
