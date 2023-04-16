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

interface UserByIdResponse {
  email: string;
  document: string;
  balance: number;
}

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prismaService: PrismaService) {}

  async getUser(email: string): Promise<UserResponse> {
    const user = await this.prismaService.user.findUniqueOrThrow({
      where: {
        email,
      },
    });

    return user;
  }

  async getUserById(id: string): Promise<UserByIdResponse> {
    const user = await this.prismaService.user.findUniqueOrThrow({
      include: {
        transaction: {
          where: {
            deletedAt: null,
          },
          select: {
            balance: true,
          },
        },
      },
      where: {
        id,
      },
    });

    const userBalance = user.transaction.reduce(
      (acc, cur) => (acc += cur.balance),
      0,
    );

    const sumUser = {
      email: user.email,
      document: user.document,
      balance: userBalance,
    };

    return sumUser;
  }

  async createUser(user: User): Promise<void> {
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
