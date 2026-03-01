// src/tasks/tasks.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  // Crear tarea y asignarla al usuario que hizo la petición
  async create(createTaskDto: any, userId: number) {
    const newTask = this.tasksRepository.create({
      ...createTaskDto,
      owner: { id: userId }, // Relacionamos la tarea con el dueño
    });
    return this.tasksRepository.save(newTask);
  }

  // Buscar tareas del usuario (con filtro opcional)
  async findAll(userId: number, status?: TaskStatus) {
    const whereCondition: any = { owner: { id: userId } };
    if (status) {
      whereCondition.status = status; // Filtrado por estado
    }
    
    return this.tasksRepository.find({
      where: whereCondition,
      order: { created_at: 'DESC' }, // Las más nuevas primero
    });
  }

  // Actualizar tarea
  async update(id: number, updateTaskDto: any) {
    await this.tasksRepository.update(id, updateTaskDto);
    return this.tasksRepository.findOneBy({ id });
  }

  // Eliminar tarea
  async remove(id: number) {
    await this.tasksRepository.delete(id);
    return { deleted: true };
  }
}