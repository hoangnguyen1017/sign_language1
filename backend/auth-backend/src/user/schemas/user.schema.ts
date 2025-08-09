import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  account: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  // ⬇️ Thông tin khảo sát
  @Prop()
  age: number;

  @Prop()
  gender: string;

  @Prop()
  occupation: string;

  @Prop()
  userGroup: string; // Giá trị: "Người khiếm thính", "Người thân", "Giáo viên", "Người quan tâm"

  @Prop()
  otp: string;

  @Prop()
  otpExpires: Date;
}
export const UserSchema = SchemaFactory.createForClass(User);
