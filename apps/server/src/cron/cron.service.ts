import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class CronService {
  constructor(private mailerService: MailerService) {}

  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  async handleCron() {
    console.log('Sending daily email...');

    // await this.mailerService.sendMail()
  }
}
