import { Controller, Post, Body, Get } from '@nestjs/common';
import { FeedbackService } from './feedback.service';

@Controller('feedback')
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  @Post()
  async submit(@Body() body: { username: string; subject: string; content: string }) {
    const { username, subject, content } = body;
    return this.feedbackService.create(username, subject, content);
    }
  @Get()
  async getAll() {
    return this.feedbackService.findAll();
  }
}
