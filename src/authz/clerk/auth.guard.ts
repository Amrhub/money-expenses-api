import { clerkClient } from '@clerk/clerk-sdk-node';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies.__session;
    if (!token) return false;

    try {
      request.user = await clerkClient.verifyToken(request.cookies.__session);
    } catch (error) {
      console.error(error);
      return false;
    }

    return true;
  }
}
