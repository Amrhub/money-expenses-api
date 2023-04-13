import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  <T extends UserKey | undefined>(
    userKey: T,
    ctx: ExecutionContext,
  ): ReturnType<T> => {
    const request = ctx.switchToHttp().getRequest();
    const user: User = request.user;
    user.id = user.sub;
    return userKey
      ? (user?.[userKey] as ReturnType<typeof userKey>)
      : (user as ReturnType<typeof userKey>);
  },
);

interface User {
  id: string;
  iss: string;
  sub: string;
  aud: string[];
  iat: number;
  exp: number;
  azp: string;
  scope: string;
}
type UserKey = 'id' | 'iss' | 'sub' | 'aud' | 'iat' | 'exp' | 'azp' | 'scope';

type ReturnType<T extends UserKey | undefined> = T extends undefined
  ? User
  : User[T];
