import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { LoggerModule } from './logger/logger.module';
import { DbModule } from './db/db.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [ConfigModule, LoggerModule, DbModule],
})
export class AppModule {}
