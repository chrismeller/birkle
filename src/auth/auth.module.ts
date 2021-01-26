import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Hasher } from './hasher.provider';

@Module({
  providers: [AuthService, Hasher]
})
export class AuthModule {}
