import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeedbackModule } from './user/feedback.module';
import { ConfigModule } from '@nestjs/config';

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  throw new Error('MONGODB_URI environment variable is not set');
}

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(mongoUri),
    MongooseModule.forRoot(mongoUri, { connectionName: 'feedbackConnection' }),
    AuthModule,
    UserModule,
    FeedbackModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}