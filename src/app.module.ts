import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // Configuración de la base de datos SQLite
    TypeOrmModule.forRoot({
      type: 'sqlite', // 
      database: 'database.sqlite', // El archivo se creará automáticamente en la raíz
      autoLoadEntities: true, // Carga automáticamente las entidades que creemos
      synchronize: true, // ¡Solo para desarrollo! Crea/actualiza las tablas automáticamente [cite: 46]
    }),
    UsersModule,
    TasksModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}