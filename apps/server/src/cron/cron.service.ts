import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MailerService } from 'src/mailer/mailer.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CronService {
  constructor(
    private mailerService: MailerService,
    private userService: UserService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  async handleCron() {
    console.log('Sending daily email...');

    const users = await this.userService.getUsersForEmail();

    const sendMailPromises = users.map(async (user) => {
      try {
        await this.mailerService.sendMail({
          html: 'This is a friendly reminder, please complete the driver onboarding form to get started with use',
          subject: 'Reminder Mail',
          to: [user?.email],
        });
        user.reminder_mail_count += 1;
        await user.save();
      } catch (error) {
        console.error(`Failed to send email to ${user.email}`, error);
      }
    });

    await Promise.all(sendMailPromises);
  }
}
