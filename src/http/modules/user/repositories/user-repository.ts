import { User } from '../entities/user';

interface UserResponse {
  id: string;
  password: string;
  email: string;
  document: string;
}

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  abstract get(email: string): Promise<UserResponse>;
}
