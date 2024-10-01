import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ClerkAuthGuard } from './auth.guard';

export function Auth() {
  return applyDecorators(
    UseGuards(ClerkAuthGuard),
    ApiCookieAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
