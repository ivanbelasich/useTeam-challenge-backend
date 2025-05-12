import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from '../schemas/task.schema';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
  ) {}

  async create(createTaskDto: Partial<Task>): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async findByStatus(status: string): Promise<Task[]> {
    return this.taskModel.find({ status }).exec();
  }

  async update(id: string, updateTaskDto: Partial<Task>): Promise<Task> {
    const updatedTask = await this.taskModel
      .findByIdAndUpdate(
        id,
        { ...updateTaskDto, updatedAt: new Date() },
        { new: true },
      )
      .exec();

    if (!updatedTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return updatedTask;
  }

  async updateStatus(id: string, status: string): Promise<Task> {
    const updatedTask = await this.taskModel
      .findByIdAndUpdate(id, { status, updatedAt: new Date() }, { new: true })
      .exec();

    if (!updatedTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return updatedTask;
  }

  async remove(id: string): Promise<Task> {
    const deletedTask = await this.taskModel.findByIdAndDelete(id).exec();

    if (!deletedTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return deletedTask;
  }
}
