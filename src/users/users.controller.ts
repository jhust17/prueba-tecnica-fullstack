import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // Eliminamos los endpoints CRUD autogenerados porque 
  // no se requieren para esta prueba técnica.
}