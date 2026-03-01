import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(username: string, pass: string) {
    // 1. Buscamos al usuario en la base de datos (crearemos esta función en breve)
    const user = await this.usersService.findOneByUsername(username);
    
    // 2. Verificamos que exista y que la contraseña coincida
    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // 3. Generamos el token JWT
    const payload = { sub: user.id, username: user.username };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}