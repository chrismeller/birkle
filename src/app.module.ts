import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { UsersModule } from './users/users.module';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [ConfigModule, LoggerModule, UsersModule, DbModule],
  imports: [ConfigModule, DbModule],
  imports: [ConfigModule, DbModule, AuthModule],
})
export class AppModule {}
