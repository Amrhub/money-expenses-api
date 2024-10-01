import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [
    {
      provide: PrismaService,
      useFactory: async () => {
        return new PrismaService().initPrismaWithClientExtension();
      },
    },
  ],
  exports: [PrismaService],
})
export class PrismaModule {}
