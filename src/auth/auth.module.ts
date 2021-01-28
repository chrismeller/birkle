import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Hasher } from './hasher.provider';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';
import { MailModule } from '../mail/mail.module';
import { JwtFactory } from './jwt.factory';
import { JwtStrategy } from './jwt.strategy';
import { JwtRefreshTokenStrategy } from './jwt.refreshToken.strategy';
import { TokenService } from './token.service';
import { ConfigModule } from '../config/config.module';
import { DbModule } from '../db/db.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  providers: [AuthService, Hasher, LocalStrategy, JwtFactory, JwtStrategy, JwtRefreshTokenStrategy, TokenService],
  imports: [UsersModule, MailModule, ConfigModule, PassportModule, DbModule],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
