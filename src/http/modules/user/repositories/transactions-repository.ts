import { Transaction } from '../entities/transaction';

export abstract class TransactionsRepository {
  abstract createTransactions(transaction: Transaction): Promise<void>;
  abstract getTransactionsTodayTransactions(): Promise<{ id: string }[]>;
  abstract deleteTransactions(transactions: { id: string }[]): Promise<void>;
}
