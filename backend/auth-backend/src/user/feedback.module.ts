import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Feedback, FeedbackSchema } from './schemas/feedback.schema';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';

@Module({
  imports: [
    MongooseModule.forFeature(
        [{ name: Feedback.name, schema: FeedbackSchema }],
        'feedbackConnection' // <-- Đúng kết nối
    ),
    ],
  providers: [FeedbackService],
  controllers: [FeedbackController],
})
export class FeedbackModule {}
