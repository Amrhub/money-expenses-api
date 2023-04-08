import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { toNumber } from '../helpers/cast.helper';
export class PaginationDto {
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => toNumber(value))
  page?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @Transform(({ value }) => toNumber(value))
  @IsOptional()
  rowsPerPage?: number;
}
