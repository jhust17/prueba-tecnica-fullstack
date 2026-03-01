import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule, // Importamos el módulo de usuarios para poder buscarlos
    JwtModule.register({
      global: true,
      secret: 'MI_SUPER_SECRETO_PARA_LA_PRUEBA', // En producción esto va en variables de entorno (.env)
      signOptions: { expiresIn: '1d' }, // El token durará 1 día
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}