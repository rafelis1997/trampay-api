import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { TransactionsRepository } from 'src/http/modules/user/repositories/transactions-repository';
import { Transaction } from 'src/http/modules/user/entities/transaction';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';

@Injectable()
export class PrismaTransactionRepository implements TransactionsRepository {
  constructor(private prismaService: PrismaService) {}

  async deleteTransactions(transactions: { id: string }[]): Promise<void> {
    dayjs.extend(utc);

    for (const transaction of transactions) {
      await this.prismaService.transaction.update({
        data: {
          deletedAt: dayjs().utc().toISOString(),
        },
        where: {
          id: transaction.id,
        },
      });
    }
  }

  async getTransactionsTodayTransactions(): Promise<{ id: string }[]> {
    dayjs.extend(utc);

    const endOfDay = dayjs().utc().endOf('day').toISOString(); // 1 day back from now
    const startOfDay = dayjs().utc().startOf('day').toISOString();

    const transactions = await this.prismaService.transaction.findMany({
      where: {
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
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
