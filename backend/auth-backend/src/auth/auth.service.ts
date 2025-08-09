import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../user/schemas/user.schema';
import { AppMailService } from '../auth/mail.service'; // Đảm bảo bạn có import mail service
import { randomInt } from 'crypto';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private appMailService: AppMailService,
  ) {}

  async register(userData: any) {
    const existing = await this.userModel.findOne({ account: userData.account });
    if (existing) throw new ConflictException('Tài khoản đã tồn tại');

    const hashed = await bcrypt.hash(userData.password, 10);
    const createdUser = new this.userModel({ ...userData, password: hashed });
    await createdUser.save();
    return { message: 'Đăng ký thành công' };
  }

  async login({ username, password }: { username: string; password: string }) {
    const user = await this.userModel.findOne({
      $or: [{ account: username }, { username }],
    });

    if (!user) throw new UnauthorizedException('Tài khoản không tồn tại');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Sai mật khẩu');

    const token = this.jwtService.sign({ sub: user._id, username: user.username });
    return { message: 'Đăng nhập thành công', token, username: user.username };
  
  }
  async sendOtp(account: string) {
    const user = await this.userModel.findOne({ account });
    if (!user) throw new UnauthorizedException('Email không tồn tại');

    const otp = randomInt(100000, 999999).toString();
    // Bạn nên lưu otp này vào DB hoặc cache (VD: Redis), ở đây ví dụ đơn giản
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 5 * 60 * 1000); // Hết hạn sau 5 phút
    await user.save();

    await this.appMailService.sendOtp(account, otp);

    return { message: 'OTP đã được gửi tới email của bạn' };
  }
  async verifyOtp(account: string, otp: string) {
    const user = await this.userModel.findOne({ account: account }); // hoặc `username` nếu dùng username

    if (!user || user.otp !== otp) {
      throw new UnauthorizedException('OTP không hợp lệ');
    }

    // Kiểm tra thời hạn OTP nếu có
    if (user.otpExpires && user.otpExpires < new Date()) {
      throw new UnauthorizedException('OTP đã hết hạn');
    }

    return { message: 'Xác thực OTP thành công' };
  }
    async resetPassword(account: string, otp: string, newPassword: string) {
    const user = await this.userModel.findOne({ account });

    if (!user) throw new UnauthorizedException('user không tồn tại');

    if (!user || user.otp !== otp) {
      throw new UnauthorizedException('OTP không hợp lệ');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return { message: 'Mật khẩu đã được đổi thành công' };
  }

}
