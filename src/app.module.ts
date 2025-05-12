import { Module } from '@nestjs/common';
import { BoardModule } from './tasks/task.module';
import { TaskGateway } from './websockets/task.gateway';
import { TaskController } from './tasks/controllers/task.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('mongodb.database.connectionString'),
        dbName: configService.get<string>('mongodb.database.databaseName'),
      }),
      inject: [ConfigService],
    }),
    BoardModule,
  ],
  controllers: [TaskController],
  providers: [TaskGateway],
})
export class AppModule {}
