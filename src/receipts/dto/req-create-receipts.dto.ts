import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNumber,
  IsPositive,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class Item {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @Min(0.1)
  price: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @Min(1)
  quantity: number;
}

export class ReqCreateReceiptsDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({
    type: () => [Item],
  })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Item)
  items: Item[];
}
