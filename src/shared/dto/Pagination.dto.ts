import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { toNumber } from '../helpers/cast.helper';
export class PaginationDto {
  @ApiProperty()
  @IsNumber()
  @Transform(({ value }) => toNumber(value))
  page: number;

  @ApiProperty()
  @IsNumber()
  @Transform(({ value }) => toNumber(value))
  rowsPerPage: number;
}
