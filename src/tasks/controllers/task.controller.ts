import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { Task } from '../schemas/task.schema';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() createTaskDto: Partial<Task>) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  async findAll() {
    return this.taskService.findAll();
  }

  @Get(':status')
  async findByStatus(@Param('status') status: string) {
    return this.taskService.findByStatus(status);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: Partial<Task>) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Put(':id/status')
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.taskService.updateStatus(id, status);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
