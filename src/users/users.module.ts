import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DbModule } from '../database/db.module';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  imports: [DbModule]
})
export class UsersModule {}
