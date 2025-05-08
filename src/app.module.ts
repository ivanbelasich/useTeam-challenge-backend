import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardModule } from './board/board.module';
import { BoardGateway } from './websockets/board.gateway';
import { TaskController } from './board/controllers/task.controller';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI ?? 'mongodb://localhost:27017/kanban',
    ),
    BoardModule,
  ],
  controllers: [TaskController],
  providers: [BoardGateway],
})
export class AppModule {}
