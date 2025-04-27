import { Module } from '@nestjs/common';
import { MailerModule } from 'src/mailer/mailer.module';
import { UserModule } from 'src/user/user.module';
import { CronService } from './cron.service';

@Module({
  imports: [UserModule, MailerModule],
  providers: [CronService],
})
export class CronModule {}
