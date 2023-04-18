import { User } from '../entities/user';

interface UserResponse {
  id: string;
  password: string;
  email: string;
  document: string;
  balance: number;
}

interface UserByIdResponse {
  email: string;
  document: string;
  balance: number;
}

export abstract class UserRepository {
  abstract createUser(user: User): Promise<void>;
  abstract getUser(email: string): Promise<UserResponse>;
  abstract getUserById(id: string): Promise<UserByIdResponse>;
  abstract setRecoverPasswordToken(
    token: string,
    userEmail: string,
  ): Promise<void>;
  abstract alterUserPassword(token: string, password: string): Promise<void>;
}
