import { Injectable } from '@nestjs/common';

import { TransactionsRepository } from '../repositories/transactions-repository';
import { Transaction } from '../entities/transaction';
import { parse } from 'papaparse';
import { unlink } from 'fs/promises';

@Injectable()
export class AddTransactionsToUsers {
  constructor(private transactionRepository: TransactionsRepository) {}

  async execute(request: string) {
    const csvData = request;

    const lastDayTransactions =
      await this.transactionRepository.getTransactionsTodayTransactions();

    if (lastDayTransactions) {
      await this.transactionRepository.deleteTransactions(lastDayTransactions);
    }

    const transactions: {
      data: { document: string; balance: string }[];
    } = parse(csvData, {
      header: true,
      skipEmptyLines: true,
      delimiter: ',',
      complete: (results) => results,
    });

    for (const transaction of transactions.data) {
      const newTransaction = new Transaction({
        userDocument: transaction.document,
        balance: Number(transaction.balance),
      });

      await this.transactionRepository.createTransactions(newTransaction);
    }

    await unlink('src/tmp/dummy.csv');
  }
}
