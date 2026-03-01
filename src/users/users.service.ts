import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // 1. Aquí está la función que arregla tu error ts(2339)
  async findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }

  // 2. Esta función se ejecuta sola al iniciar la aplicación.
  // Cumple con el requisito de crear 3 usuarios de prueba.
  async onModuleInit() {
    const count = await this.usersRepository.count();
    
    // Solo los crea si la base de datos está vacía
    if (count === 0) {
      const passwords = await Promise.all([
        bcrypt.hash('admin123', 10), // Encriptamos las contraseñas
        bcrypt.hash('test1234', 10),
        bcrypt.hash('dev2024', 10),
      ]);

      await this.usersRepository.save([
        { username: 'admin', password: passwords[0] },
        { username: 'tester', password: passwords[1] },
        { username: 'developer', password: passwords[2] },
      ]);
      console.log('✅ 3 usuarios de prueba creados exitosamente en SQLite');
    }
  }
}