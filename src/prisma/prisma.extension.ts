import { PrismaClient } from '@prisma/client';

export const prismaExtendedClient = async (client: PrismaClient) => {
  return client.$extends({
    result: {
      receipt: {
        totalPrice: {
          needs: {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            items: true,
          },
          compute(data) {
            return data.items.reduce(
              (acc: number, item: any) => acc + item.price * item.quantity,
              0,
            );
          },
        },
      },
    },
  });
};
