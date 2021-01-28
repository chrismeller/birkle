import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { MailService } from './mail.service';
import { SendgridProvider } from './sendgrid.provider';

@Module({
  providers: [MailService, SendgridProvider],
  exports: [MailService],
  imports: [ConfigModule],
})
export class MailModule {}
