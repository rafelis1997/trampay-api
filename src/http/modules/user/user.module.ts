import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UsersController } from './controllers/user.controller';
import { CreateUser } from './use-cases/create-user';
import { AddTransactionsToUsers } from './use-cases/add-transactions-to-users';
import { GetUserById } from './use-cases/get-user-by-id';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [CreateUser, AddTransactionsToUsers, GetUserById],
})
export class UserModule {}
