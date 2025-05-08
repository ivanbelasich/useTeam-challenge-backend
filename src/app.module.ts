import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardModule } from './tasks/task.module';
import { TaskGateway } from './websockets/task.gateway';
import { TaskController } from './tasks/controllers/task.controller';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI ?? 'mongodb://localhost:27017/kanban',
    ),
    BoardModule,
  ],
  controllers: [TaskController],
  providers: [TaskGateway],
})
export class AppModule {}
