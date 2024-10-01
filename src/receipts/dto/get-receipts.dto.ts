import { ApiProperty } from '@nestjs/swagger';
import { Item, Prisma } from '@prisma/client';

type ReceiptsWithItems = Prisma.ReceiptGetPayload<{
  include: {
    items: true;
  };
}>;

class ReceiptItem implements Item {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  receiptId: number;
}

export class GetReceiptResponseDto implements ReceiptsWithItems {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  isDeleted: boolean;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({
    type: [ReceiptItem],
  })
  items: ReceiptItem[];
}
