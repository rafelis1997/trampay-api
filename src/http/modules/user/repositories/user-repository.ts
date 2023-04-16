import { User } from '../entities/user';

interface UserResponse {
  id: string;
  password: string;
  email: string;
  document: string;
}

export abstract class UserRepository {
  abstract createUser(user: User): Promise<void>;
  abstract getUser(email: string): Promise<UserResponse>;
}
