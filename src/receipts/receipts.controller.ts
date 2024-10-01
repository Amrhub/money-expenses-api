import { Controller, Post, Body, Get } from '@nestjs/common';
import { ReceiptsService } from './receipts.service';
import { ReqCreateReceiptsDto } from './dto/req-create-receipts.dto';
import { Auth } from 'src/authz/clerk/auth.decorator';
import { User } from 'src/authz/clerk/user.decorator';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetReceiptResponseDto } from './dto/get-receipts.dto';

@Controller('receipts')
@ApiTags('receipts')
@Auth()
export class ReceiptsController {
  constructor(private readonly receiptsService: ReceiptsService) {}

  @Post()
  async create(
    @User('id') userId,
    @Body() reqCreateReceiptsDto: ReqCreateReceiptsDto,
  ) {
    return await this.receiptsService.create({
      ...reqCreateReceiptsDto,
      userId,
    });
  }

  @Get()
  @ApiOkResponse({
    type: [GetReceiptResponseDto],
  })
  findAll(@User('id') userId) {
    return this.receiptsService.findAll(userId);
  }
}
