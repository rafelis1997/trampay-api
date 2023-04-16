import { Injectable } from '@nestjs/common';

import { User } from 'src/http/modules/user/entities/user';
import { PrismaService } from '../prisma.service';
import { TransactionsRepository } from 'src/http/modules/user/repositories/transactions-repository';
import { Transaction } from 'src/http/modules/user/entities/transaction';

interface UserResponse {
  id: string;
  password: string;
  email: string;
  document: string;
}

@Injectable()
export class PrismaTransactionRepository implements TransactionsRepository {
  constructor(private prismaService: PrismaService) {}

  async createTransactions(transaction: Transaction): Promise<void> {
    const hasUser = await this.prismaService.user.findFirst({
      where: {
        document: transaction.userDocument,
      },
    });

    if (!hasUser) {
      console.error('User not found');
    }

    await this.prismaService.transaction.create({
      data: {
        balance: transaction.balance,
        id: transaction.id,
        userDocument: transaction.userDocument,
      },
    });
  }
}
