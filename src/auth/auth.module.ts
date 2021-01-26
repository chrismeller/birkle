import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Hasher } from './hasher.provider';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';

@Module({
  providers: [AuthService, Hasher, LocalStrategy],
  imports: [UsersModule],
  controllers: [AuthController]
})
export class AuthModule {}
