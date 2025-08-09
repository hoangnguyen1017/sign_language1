import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() body: any) {
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body() body: any) {
    return this.authService.login(body);
  }
  @Post('forgot-password/send-otp')
  sendOtp(@Body('account') account: string) {
    return this.authService.sendOtp(account);
  }
  @Post('forgot-password/verify-otp')
  verifyOtp(@Body() body: { account: string; otp: string }) {
    return this.authService.verifyOtp(body.account, body.otp);
  }
  @Post('forgot-password/reset')
  resetPassword(
    @Body() body: { account: string; otp: string; newPassword: string }
  ) {
    return this.authService.resetPassword(body.account, body.otp, body.newPassword);
  }
}
