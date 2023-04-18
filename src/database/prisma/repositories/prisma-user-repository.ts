import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import * as bcrypt from 'bcrypt';

import { User } from 'src/http/modules/user/entities/user';
import { UserRepository } from 'src/http/modules/user/repositories/user-repository';
import { PrismaService } from '../prisma.service';

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

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prismaService: PrismaService) {}
  async alterUserPassword(token: string, password: string): Promise<void> {
    const isValid = await this.checkRecoverPasswordToken(token);

    if (typeof isValid !== 'number') {
      const hashedPassword = await bcrypt.hash(password, 10);
      await this.prismaService.user.update({
        data: {
          password: hashedPassword,
        },
        where: {
          id: isValid.id,
        },
      });
      return;
    }

    throw new Error('Not possible to alter user password');
  }

  async setRecoverPasswordToken(
    token: string,
    userEmail: string,
  ): Promise<void> {
    const expDate = Date.now() + 15 * 60 * 1000; // 15 minutes forward from now
    const expDateString = new Date(expDate).toISOString();

    try {
      await this.prismaService.user.update({
        data: {
          recoverPassToken: token,
          recoverPassExp: expDateString,
        },
        where: {
          email: userEmail,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  private async checkRecoverPasswordToken(
    token: string,
  ): Promise<number | { id: string }> {
    const hasFoundToken = await this.prismaService.user.findFirst({
      select: {
        id: true,
        recoverPassToken: true,
        recoverPassExp: true,
      },

      where: {
        recoverPassToken: token,
      },
    });

    if (!hasFoundToken) {
      return -1;
    }

    const isExpired =
      dayjs(new Date()).minute() > dayjs(hasFoundToken.recoverPassExp).minute();

    if (isExpired) return -1;

    return { id: hasFoundToken.id };
  }

  async getUser(email: string): Promise<UserResponse> {
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
        email,
      },
    });

    const userBalance = user.transaction.reduce(
      (acc, cur) => (acc += cur.balance),
      0,
    );

    const sumUser = {
      id: user.id,
      email: user.email,
      document: user.document,
      balance: userBalance,
      password: user.password,
    };

    return sumUser;
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
