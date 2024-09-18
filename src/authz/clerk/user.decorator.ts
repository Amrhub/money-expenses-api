import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  <T extends UserKey | undefined>(
    userKey: T,
    ctx: ExecutionContext,
  ): ReturnType<T> => {
    const request = ctx.switchToHttp().getRequest();
    // request.user is injected in the ClerkAuthGuard
    const user: User = request.user;
    user.id = user.sub;
    return userKey
      ? (user?.[userKey] as ReturnType<typeof userKey>)
      : (user as ReturnType<typeof userKey>);
  },
);

// To understand these acronyms, you can refer to the following: https://clerk.com/docs/backend-requests/resources/session-tokens#default-session-claims
interface User {
  /**
   * User id is set in the decorator not part of clerk's default claims
   */
  id: string;
  /**
   * Session id
   */
  sid: string;
  /**
   * Issuer
   */
  iss: string;
  /**
   * Subject (user id)
   */
  sub: string;

  /**
   * not before
   */
  nbf: number;
  /**
   * Issued at
   */
  iat: number;
  /**
   * Expiration time
   */
  exp: number;
  /**
   * Authorized party
   */
  azp: string;
}

type UserKey = keyof User;

type ReturnType<T extends UserKey | undefined> = T extends undefined
  ? User
  : User[T];
