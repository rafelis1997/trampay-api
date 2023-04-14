import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUser } from 'src/use-cases/create-user';
import { CreateUserBody } from '../dtos/CreateUserBody';

@Controller('users')
export class UsersController {
  constructor(private createUser: CreateUser) {}

  @Post()
  async create(@Body() body: CreateUserBody) {
    const { document, email, password } = body;

    await this.createUser.execute({ document, email, password });
  }
}
