import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter: Transporter;
  constructor(private configServive: ConfigService) {
    this.transporter = createTransport({
      service: 'Gmail',
      auth: {
        user: this.configServive.get('EMAIL_USER'),
        pass: this.configServive.get('EMAIL_PASS'),
      },
    });
  }

  sendMail({
    subject,
    html,
    to,
  }: {
    to: string[];
    subject: string;
    html: string;
  }) {
    return this.transporter.sendMail({
      from: this.configServive.get('EMAIL_USER'),
      to,
      subject,
      text: '',
      html,
    });
  }
}
