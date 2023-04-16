import { Injectable } from '@nestjs/common';

import { UserRepository } from '../repositories/user-repository';

interface GetUserByIdRequest {
  id: string;
}

@Injectable()
export class GetUserById {
  constructor(private userRepository: UserRepository) {}

  async execute(
    request: GetUserByIdRequest,
  ): Promise<{ email: string; document: string; balance: number }> {
    const { id } = request;

    const user = await this.userRepository.getUserById(id);

    return user;
  }
}
