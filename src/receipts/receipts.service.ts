import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { ReqCreateReceiptsDto } from './dto/req-create-receipts.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class ReceiptsService {
  constructor(private prismaService: PrismaService) {}

  async create(
    reqCreateReceiptsDto: ReqCreateReceiptsDto & { userId: string },
  ) {
    try {
      const jsonItemsArray =
        reqCreateReceiptsDto.items as unknown as Prisma.JsonArray;
      delete reqCreateReceiptsDto.items;
      const receipt = await this.prismaService.receipt.create({
        data: {
          ...reqCreateReceiptsDto,
          items: jsonItemsArray,
        },
      });

      return receipt;
    } catch (error) {
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
    });
  }
}
