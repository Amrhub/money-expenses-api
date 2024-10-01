import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto implements CreateProductDto {
  @ApiPropertyOptional()
  name: string;

  @ApiPropertyOptional()
  price: number;
}
