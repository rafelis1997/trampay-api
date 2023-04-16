import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from 'src/http/modules/user/repositories/user-repository';
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository';
import { TransactionsRepository } from 'src/http/modules/user/repositories/transactions-repository';
import { PrismaTransactionRepository } from './prisma/repositories/prisma-transaction-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: TransactionsRepository,
      useClass: PrismaTransactionRepository,
    },
  ],
  exports: [UserRepository, TransactionsRepository],
})
export class DatabaseModule {}
