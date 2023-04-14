import { Injectable } from '@nestjs/common';

import { User } from 'src/entities/user';
import { UserRepository } from 'src/repositories/user-repository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prismaService: PrismaService) {}

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
