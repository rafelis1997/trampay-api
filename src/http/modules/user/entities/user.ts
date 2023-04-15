import { randomUUID } from 'node:crypto';

interface UserProps {
  email: string;
  password: string;
  document: string;
}

export class User {
  private _id: string;
  private props: UserProps;

  constructor(props: UserProps) {
    this._id = randomUUID();
    this.props = props;
  }

  public get id() {
    return this._id;
  }

  public get email(): string {
    return this.props.email;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get password(): string {
    return this.props.password;
  }

  public set password(password: string) {
    this.props.password = password;
  }

  public get document(): string {
    return this.props.document;
  }

  public set document(document: string) {
    this.props.document = document;
  }
}
