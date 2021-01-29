import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { DbService } from './db.service';

@Module({
  providers: [DbService],
  exports: [DbService],
  imports: [ConfigModule]
})
export class DbModule {}
