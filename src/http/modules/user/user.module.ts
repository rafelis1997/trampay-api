import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UsersController } from './controllers/user.controller';
import { CreateUser } from './use-cases/create-user';
import { AddTransactionsToUsers } from './use-cases/add-transactions-to-users';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [CreateUser, AddTransactionsToUsers],
})
export class UserModule {}
