import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  store?: string;

  @ApiProperty()
  @IsNumber()
  price: number;
}

export class CreateProduct extends CreateProductDto {
  userId: string;
}
