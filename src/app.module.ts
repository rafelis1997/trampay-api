import { Module } from '@nestjs/common';
import { HttpModule } from './http/http.module';
import { DatabaseModule } from './database/database.module';
import { AppService } from './app.service';

@Module({
  imports: [HttpModule, DatabaseModule, AppModule],
  providers: [AppService],
})
export class AppModule {}
