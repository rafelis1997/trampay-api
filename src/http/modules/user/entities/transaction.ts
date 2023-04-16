import { randomUUID } from 'node:crypto';

interface TransactionProps {
  userDocument: string;
  balance: number;
}

export class Transaction {
  private _id: string;
  private props: TransactionProps;

  constructor(props: TransactionProps) {
    this._id = randomUUID();
    this.props = props;
  }

  public get id() {
    return this._id;
  }

  public get balance(): number {
    return this.props.balance;
  }

  public set balance(balance: number) {
    this.props.balance = balance;
  }

  public get userDocument(): string {
    return this.props.userDocument;
  }

  public set userDocument(userDocument: string) {
    this.props.userDocument = userDocument;
  }
}
