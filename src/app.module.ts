import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { UsersModule } from './users/users.module';
import { DbModule } from './db/db.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [ConfigModule, LoggerModule, UsersModule, DbModule],
  imports: [ConfigModule, DbModule],
})
export class AppModule {}
