import { INestApplication, Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function extendedClient() {
  const extendClient = () =>
    prisma.$extends({
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

  // https://github.com/prisma/prisma/issues/18628#issuecomment-1601958220
  return new Proxy(class {}, {
    construct(target, args, newTarget) {
      return Object.assign(
        Reflect.construct(target, args, newTarget),
        extendClient(),
      );
    },
  }) as new () => ReturnType<typeof extendClient>;
}

@Injectable()
export class PrismaService extends extendedClient() {
  async onModuleInit() {
    // Uncomment this to establish a connection on startup, this is generally not necessary
    // https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/connection-management#connect
    await Prisma.getExtensionContext(prisma).$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      await app.close();
    });
  }
}
