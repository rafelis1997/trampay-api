import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UsersController } from './controllers/user.controller';
import { CreateUser } from './use-cases/create-user';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [CreateUser],
})
export class UserModule {}
