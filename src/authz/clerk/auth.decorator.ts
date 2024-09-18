import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ClerkAuthGuard } from './auth.guard';

export function Auth() {
  return applyDecorators(
    UseGuards(ClerkAuthGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
