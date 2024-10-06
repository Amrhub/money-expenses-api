import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/shared/dto/Pagination.dto';
import { CreateProduct } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createProductDto: CreateProduct) {
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

  createMany(createProductDtos: CreateProduct[]) {
    return this.prismaService.product.createMany({
      data: createProductDtos,
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

  /**
   * @param isPutMethod - if true, it means the request is a PUT request and not specified core fields should be set to null. core fields are name, price, and store
   */
  async update(
    id: number,
    updateProductDto: CreateProduct,
    isPutMethod?: boolean,
  ) {
    const data:
      | CreateProduct
      | {
          name: string;
          price: number;
          store: string;
        } = isPutMethod
      ? {
          name: updateProductDto.name,
          price: updateProductDto.price,
          store: updateProductDto.store ?? null,
        }
      : updateProductDto;

    try {
      return await this.prismaService.product.update({
        where: { id },
        data: data,
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

  async findAllStores(userId: string) {
    const stores = await this.prismaService.product.findMany({
      where: { isDeleted: false, userId },
      select: { store: true },
    });

    return stores.map((store) => store.store);
  }
}
