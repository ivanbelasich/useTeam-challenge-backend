import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { TaskService } from '../tasks/services/task.service';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
})
export class TaskGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly taskService: TaskService) {}

  @SubscribeMessage('cardMoved')
  async handleCardMoved(
    client: any,
    payload: { cardId: string; sourceColumn: string; targetColumn: string },
  ) {
    try {
      const updatedTask = await this.taskService.updateStatus(
        payload.cardId,
        payload.targetColumn,
      );

      this.server.emit('cardMoved', {
        cardId: payload.cardId,
        targetColumn: payload.targetColumn,
      });

      return { success: true, task: updatedTask };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('taskUpdated')
  async handleTaskUpdated(
    client: any,
    payload: { id: string; title: string; description: string },
  ) {
    try {
      const updatedTask = await this.taskService.update(payload.id, {
        title: payload.title,
        description: payload.description,
      });
      this.server.emit('taskUpdated', updatedTask);
      return { success: true, task: updatedTask };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('taskDeleted')
  async handleTaskDeleted(client: any, id: string) {
    try {
      await this.taskService.remove(id);
      this.server.emit('taskDeleted', id);
      return { success: true, message: 'Task deleted successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('taskCreated')
  async handleTaskCreated(
    client: any,
    payload: { title: string; description: string; status: string },
  ) {
    try {
      const newTask = await this.taskService.create(payload);
      this.server.emit('taskCreated', newTask);
      return { success: true, task: newTask };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('getTasks')
  async handleGetTasks() {
    try {
      const tasks = await this.taskService.findAll();
      return { success: true, tasks };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
