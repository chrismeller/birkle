import { Module } from '@nestjs/common';
import { TimersService } from './timers.service';
import { TimersController } from './timers.controller';
import { DbModule } from '../database/db.module';

@Module({
  controllers: [TimersController],
  providers: [TimersService],
  imports: [DbModule]
})
export class TimersModule {}
