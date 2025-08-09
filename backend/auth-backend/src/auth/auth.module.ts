import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { AppMailService } from '../auth/mail.service';


@Module({
  imports: [
    UserModule, // ✅ Dùng lại UserModel được cung cấp từ UserModule
    JwtModule.register({
      secret: 'yourSecretKey',
      signOptions: { expiresIn: '1d' },
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com', // hoặc SMTP server của bạn
        port: 587,
        secure: false,
        auth: {
          user: 'nguyennhathoang1710@gmail.com',
          pass: 'rlod fnqq fhvw jnbz', // là app password, không phải password Gmail
        },
      },
      defaults: {
        from: '"No Reply" <nguyennhathoang1710@gmail.com>',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,AppMailService],
  exports: [AuthService], // Optional: nếu muốn sử dụng AuthService nơi khác
})
export class AuthModule {}
