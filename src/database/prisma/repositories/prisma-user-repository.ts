import { Injectable } from '@nestjs/common';

import { User } from 'src/http/modules/user/entities/user';
import { UserRepository } from 'src/http/modules/user/repositories/user-repository';
import { PrismaService } from '../prisma.service';

interface UserResponse {
  id: string;
  password: string;
  email: string;
  document: string;
}

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prismaService: PrismaService) {}

  async get(email: string): Promise<UserResponse> {
    const user = await this.prismaService.user.findUniqueOrThrow({
      where: {
        email,
      },
    });

    return user;
  }

  async create(user: User): Promise<void> {
    await this.prismaService.user.create({
      data: {
        id: user.id,
        document: user.document,
        email: user.email,
        password: user.password,
      },
    });
  }
}
