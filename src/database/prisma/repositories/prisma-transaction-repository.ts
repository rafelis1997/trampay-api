import { Injectable } from '@nestjs/common';

import { User } from 'src/http/modules/user/entities/user';
import { PrismaService } from '../prisma.service';
import { TransactionsRepository } from 'src/http/modules/user/repositories/transactions-repository';
import { Transaction } from 'src/http/modules/user/entities/transaction';

@Injectable()
export class PrismaTransactionRepository implements TransactionsRepository {
  constructor(private prismaService: PrismaService) {}

  async deleteTransactions(transactions: { id: string }[]): Promise<void> {
    for (const transaction of transactions) {
      await this.prismaService.transaction.update({
        data: {
          deletedAt: new Date(),
        },
        where: {
          id: transaction.id,
        },
      });
    }
  }

  async getTransactionsTodayTransactions(): Promise<{ id: string }[]> {
    const lastDay = Date.now() - 24 * 60 * 60 * 1000;
    const lastDayString = new Date(lastDay).toISOString();

    const transactions = await this.prismaService.transaction.findMany({
      where: {
        createdAt: {
          gte: lastDayString,
        },
      },
    });

    return transactions;
  }

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
