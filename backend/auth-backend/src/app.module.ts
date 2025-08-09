import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeedbackModule } from './user/feedback.module';    
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/sign_language_app'),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/sign_language_app', {
      connectionName: 'feedbackConnection',
    }),
    AuthModule,
    UserModule,
    FeedbackModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}