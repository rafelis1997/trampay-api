import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user';
import { UserRepository } from '../repositories/user-repository';

interface CreateUserRequest {
  email: string;
  password: string;
  document: string;
}

@Injectable()
export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(request: CreateUserRequest) {
    const { document, email, password } = request;

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      email,
      document,
      password: hashPassword,
    });

    await this.userRepository.createUser(user);
  }
}
