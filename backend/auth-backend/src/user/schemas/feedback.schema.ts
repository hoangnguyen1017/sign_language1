import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'feedback_user' })
export class Feedback extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  subject: string; // <-- Chủ đề phản hồi

  @Prop({ required: true })
  content: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}


export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
