import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class ReqCreateReceiptsDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({
    type: () => [Item],
  })
  @IsArray()
  items: Item[];
}

export class Item {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  price: number;

  @ApiProperty()
  @IsString()
  quantity: number;
}
