import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@prisma/client';

class ProductClass implements Product {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  store: string;

  @ApiProperty()
  isDeleted: boolean;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  userId: string;
}

export class GetProductsResponseDto {
  @ApiProperty({
    type: () => [ProductClass],
  })
  products: Product[];

  @ApiProperty()
  count: number;
}
