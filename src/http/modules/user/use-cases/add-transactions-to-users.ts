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

    const transactionsMap = new Map();

    for (const transaction of transactions.data) {
      const hasUserBalanceMapped = transactionsMap.get(transaction.document);

      if (!hasUserBalanceMapped) {
        transactionsMap.set(transaction.document, Number(transaction.balance));
        continue;
      }

      transactionsMap.set(
        transaction.document,
        Number(hasUserBalanceMapped) + Number(transaction.balance),
      );
    }

    transactionsMap.forEach(async (balance, user) => {
      const newTransaction = new Transaction({
        userDocument: user,
        balance: Number(balance),
      });

      await this.transactionRepository.createTransactions(newTransaction);
    });
  }
}
