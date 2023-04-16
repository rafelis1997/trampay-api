import { Transaction } from '../entities/transaction';

export abstract class TransactionsRepository {
  abstract createTransactions(transaction: Transaction): Promise<void>;
  // abstract deleteTransactions(email: string): Promise<UserResponse>;
}
