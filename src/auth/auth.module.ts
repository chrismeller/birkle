import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Hasher } from './hasher.provider';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [AuthService, Hasher],
  imports: [UsersModule],
  controllers: [AuthController]
})
export class AuthModule {}
