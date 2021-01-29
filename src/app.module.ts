import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { UsersModule } from './users/users.module';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { TimersModule } from './timers/timers.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [ConfigModule, DbModule, AuthModule, UsersModule, MailModule, TimersModule],
})
export class AppModule {}
