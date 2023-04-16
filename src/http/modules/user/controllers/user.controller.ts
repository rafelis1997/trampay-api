import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { CreateUser } from 'src/http/modules/user/use-cases/create-user';
import { CreateUserBody } from '../dtos/CreateUserBody';
import { readFileSync } from 'fs';
import { AddTransactionsToUsers } from '../use-cases/add-transactions-to-users';
import { unlink } from 'fs/promises';

@Controller('users')
export class UsersController {
  constructor(
    private createUserCase: CreateUser,
    private addTransactionsToUsers: AddTransactionsToUsers,
  ) {}

  @Post()
  async createUser(@Body() body: CreateUserBody) {
    const { document, email, password } = body;

    await this.createUserCase.execute({ document, email, password });
  }

  @Post('transactions')
  @UseInterceptors(
    FileInterceptor('file_asset', {
      storage: diskStorage({
        destination: 'src/tmp/',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async uploadUsersTransactions() {
    const csvFile = readFileSync('src/tmp/dummy.csv');
    const csvData = csvFile.toString();

    await this.addTransactionsToUsers.execute(csvData);
  }
}
