// src/tasks/tasks.controller.ts
import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './entities/task.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('tasks')
@UseGuards(AuthGuard) // Protegemos todas las rutas de este controlador
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: any, @Request() req) {
    // req.user.sub viene de nuestro AuthGuard (es el ID del usuario)
    return this.tasksService.create(createTaskDto, req.user.sub);
  }

  @Get()
  findAll(@Request() req, @Query('status') status?: TaskStatus) {
    // Permite filtrado por estado mediante query parameters 
    return this.tasksService.findAll(req.user.sub, status);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: any) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}