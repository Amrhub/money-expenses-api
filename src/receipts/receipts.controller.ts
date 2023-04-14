import { Controller, Post, Body, Get } from '@nestjs/common';
import { ReceiptsService } from './receipts.service';
import { ReqCreateReceiptsDto } from './dto/req-create-receipts.dto';
import { User } from 'src/authz/decorators/user.decorator';
import { Auth } from 'src/authz/decorators/auth.decorator';

@Controller('receipts')
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
  findAll(@User('id') userId) {
    return this.receiptsService.findAll(userId);
  }
}
