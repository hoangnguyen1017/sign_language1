import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AppMailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendOtp(to: string, otp: string) {
    const html = `
      <div style="font-family: sans-serif;">
        <h2>Mã xác thực (OTP) của bạn</h2>
        <p>Mã OTP là: <strong>${otp}</strong></p>
        <p>OTP này có hiệu lực trong 5 phút.</p>
      </div>
    `;

    await this.mailerService.sendMail({
      to,
      subject: 'Mã OTP của bạn',
      html: html, // Không cần template nữa
    });
  }
}