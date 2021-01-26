import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { LoggerService } from './logger.service';

@Module({
  providers: [LoggerService],
  imports: [ConfigModule],
  exports: [LoggerService]
})
export class LoggerModule {}
