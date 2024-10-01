import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { prismaExtendedClient } from './prisma.extension';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private static instance: PrismaService;
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    if (PrismaService.instance) {
      return PrismaService.instance;
    }

    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'stdout', level: 'error' },
        { emit: 'stdout', level: 'info' },
        { emit: 'stdout', level: 'warn' },
      ],
      datasources: { db: { url: process.env.DATABASE_URL } },
    });

    PrismaService.instance = this;
  }

  async initPrismaWithClientExtension() {
    return await prismaExtendedClient(this);
  }

  async onModuleInit() {
    await this.$connect();

    // if (this.config.get('PRISMA_LOG', { infer: true })) {
    //   //@ts-expect-error: known bug in prism missing proper type
    //   this.$on('query', (e: Prisma.QueryEvent) => {
    //     this.logger.log(
    //       JSON.stringify({
    //         duration: `${e.duration}ms`,
    //         query: e.query,
    //         params: e.params,
    //       }),
    //     );
    //   });
    // }
  }
}
