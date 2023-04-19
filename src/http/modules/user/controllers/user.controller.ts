import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiTags } from '@nestjs/swagger';
import { readFile, unlink } from 'fs/promises';

import { CreateUser } from 'src/http/modules/user/use-cases/create-user';
import { CreateUserBody } from '../dtos/CreateUserBody';
import { AddTransactionsToUsers } from '../use-cases/add-transactions-to-users';
import { GetUserById } from '../use-cases/get-user-by-id';
import { AuthGuard } from '../../auth/auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private createUserCase: CreateUser,
    private getByIdUser: GetUserById,
    private addTransactionsToUsers: AddTransactionsToUsers,
  ) {}

  @Post()
  async createUser(@Body() body: CreateUserBody) {
    const { document, email, password } = body;

    await this.createUserCase.execute({ document, email, password });
  }

  @Post('transactions')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('file_asset', {
      storage: diskStorage({
        destination: 'src/tmp/',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
      fileFilter: (req, file, cb) => {
        const filetypes = /([a-zA-Z0-9\s_\\.\-\(\):])+(.csv)$/i;
        // Check ext
        const extname = filetypes.test(file.originalname.toLowerCase());

        if (extname) {
          return cb(null, true);
        } else {
          return cb(null, false);
        }
      },
    }),
  )
  async uploadUsersTransactions(@UploadedFile() file: Express.Multer.File) {
    const csvFile = await readFile(file.path);
    const csvData = csvFile.toString();

    await this.addTransactionsToUsers.execute(csvData);

    await unlink(file.path);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async GetUser(
    @Param() params: { id: string },
  ): Promise<{ email: string; document: string; balance: number }> {
    const user = await this.getByIdUser.execute(params);

    return user;
  }
}
