import { ProductsService } from './../products/products.service';
import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { ReqCreateReceiptsDto } from './dto/req-create-receipts.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from 'src/products/dto/create-product.dto';

@Injectable()
export class ReceiptsService {
  constructor(
    private prismaService: PrismaService,
    private productsService: ProductsService,
  ) {}

  async create(
    reqCreateReceiptsDto: ReqCreateReceiptsDto & { userId: string },
  ) {
    try {
      const items = reqCreateReceiptsDto.items;

      const newProductsNames = new Set(
        reqCreateReceiptsDto.newProductsNames ?? [],
      );
      const newProductsToCreate = items
        .filter((item) => newProductsNames.has(item.name))
        .map(
          (item): CreateProductDto => ({
            name: item.name,
            userId: reqCreateReceiptsDto.userId,
            price: item.price,
          }),
        );
      const modifiedProductsNames = new Set(
        reqCreateReceiptsDto.modifiedProductsNames ?? [],
      );
      const modifiedProductsToUpdate = items
        .filter((item) => modifiedProductsNames.has(item.name))
        .map((item) => ({ ...item, userId: reqCreateReceiptsDto.userId }));

      const receipt = await (this.prismaService as any).$parent.$transaction(
        async (tx) => {
          const receipt = await tx.receipt.create({
            data: {
              name: reqCreateReceiptsDto.name,
              userId: reqCreateReceiptsDto.userId,
              items: {
                createMany: {
                  data: items,
                },
              },
            },
          });

          reqCreateReceiptsDto.newProductsNames &&
            (await this.productsService.createMany(newProductsToCreate));

          reqCreateReceiptsDto.modifiedProductsNames &&
            (await Promise.all(
              modifiedProductsToUpdate.map((product) => {
                return this.prismaService.product.update({
                  where: {
                    name_userId: {
                      name: product.name,
                      userId: product.userId,
                    },
                  },
                  data: {
                    price: product.price,
                  },
                });
              }),
            ));

          return receipt;
        },
      );

      return receipt;
    } catch (error) {
      console.log(`🚀 ~ ReceiptsService ~ error:`, error);
      if (error.code === 'P2002')
        throw new BadRequestException('Receipt name already exists');

      throw new InternalServerErrorException('Something went wrong');
    }
  }

  findAll(userId: string) {
    return this.prismaService.receipt.findMany({
      where: {
        userId,
      },
      include: {
        items: true,
      },
    });
  }
}
