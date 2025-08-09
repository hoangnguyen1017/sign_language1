import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Feedback } from './schemas/feedback.schema';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel(Feedback.name,'feedbackConnection')
    private feedbackModel: Model<Feedback>,
  ) {}

  async create(username: string, subject: string, content: string): Promise<Feedback> {
    const created = new this.feedbackModel({ username, subject, content });
    return created.save();
}


  async findAll(): Promise<Feedback[]> {
    return this.feedbackModel.find().exec();
  }
}
