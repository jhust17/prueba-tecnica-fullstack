# Sistema de Gestión de Tareas - Fullstack

Esta aplicación es una solución Fullstack desarrollada para gestionar tareas internas de un equipo técnico. Permite a los usuarios autenticados administrar sus propias tareas de forma segura y eficiente.

## 🛠️ Tecnologías Utilizadas

**Frontend:**
* **React + TypeScript:** Construcción de la interfaz de usuario (SPA).
* **Vite:** Herramienta de empaquetado y servidor de desarrollo ultrarrápido.
* **Tailwind CSS v3:** Framework de utilidades para un diseño moderno y responsivo.
* **React Router DOM:** Manejo de rutas y protección de vistas privadas.

**Backend:**
* **NestJS + Node.js + TypeScript:** Framework principal para la construcción de una API REST escalable.
* **TypeORM:** Mapeo objeto-relacional (ORM) para interactuar con la base de datos.
* **SQLite 3:** Motor de base de datos relacional ligero (configurable para migrar a PostgreSQL/MySQL en producción).
* **JWT (JSON Web Tokens) & Bcrypt:** Autenticación segura y encriptación de contraseñas.

## 🏗️ Descripción General y Arquitectura

La solución se construyó utilizando un enfoque de **arquitectura separada pero unificada en el repositorio local**:
1. **Capa Backend (API REST):** Desarrollada con NestJS, expone endpoints seguros (`/login`, `/tasks`) y gestiona la lógica de negocio. Implementa un `AuthGuard` para interceptar y validar tokens JWT en cada petición.
2. **Capa de Persistencia:** Utiliza TypeORM con SQLite. Cuenta con un sistema de *Database Seeding* (`onModuleInit`) que detecta si la base de datos está vacía y crea automáticamente los usuarios de prueba requeridos. Las entidades están fuertemente relacionadas (One-To-Many entre User y Task).
3. **Capa Frontend (SPA):** Desarrollada en React, consume la API REST de forma asíncrona. Gestiona el estado global (token JWT en `localStorage`) y el estado local de los componentes para ofrecer una experiencia fluida sin recargas de página.

## 👤 Experiencia del Usuario Final

Desde el punto de vista del usuario, la aplicación funciona de la siguiente manera:
1. **Acceso Seguro:** Al ingresar a la web, el usuario es recibido por una pantalla de Login. Es imposible acceder a las tareas sin credenciales válidas.
2. **Dashboard Aislado:** Una vez iniciada la sesión, el usuario ve **únicamente sus propias tareas**. 
3. **Gestión Completa:** Puede crear nuevas tareas asignando un título, descripción, prioridad (Baja, Media, Alta) y fecha de vencimiento. También puede editar o eliminar cualquier tarea existente de manera instantánea.
4. **Filtros Rápidos:** En la parte superior, cuenta con botones interactivos para filtrar su vista entre: Todas, Pendientes, En Progreso y Completadas.
5. **Cierre de Sesión:** Puede cerrar su sesión de forma segura para proteger su información en dispositivos compartidos.

## 🔐 Credenciales de Acceso de Prueba

Al iniciar el backend por primera vez, el sistema genera automáticamente estos 3 usuarios. Puedes usar cualquiera de ellos para probar la aplicación:

* **Usuario 1:** `admin` | **Contraseña:** `admin123`
* **Usuario 2:** `tester` | **Contraseña:** `test1234`
* **Usuario 3:** `developer` | **Contraseña:** `dev2024`

## 🚀 Proceso de Despliegue en Producción

*(Nota: Aunque el código local utiliza SQLite por facilidad de desarrollo, para entornos de producción se recomienda cambiar la conexión de TypeORM a una base de datos robusta como PostgreSQL o MySQL).*

Para desplegar esta aplicación de forma gratuita y accesible públicamente, se sugiere el siguiente flujo:

### 1. Despliegue del Backend (Render.com)
1. Subir el código a un repositorio público en GitHub.
2. Crear un nuevo "Web Service" en Render conectado al repositorio.
3. Configurar el comando de compilación: `npm install && npm run build`.
4. Configurar el comando de inicio: `npm run start:prod`.
5. *(Opcional pero recomendado)*: En Render, configurar una variable de entorno `DATABASE_URL` apuntando a una base de datos PostgreSQL gratuita (ej. Neon.tech) y ajustar el `app.module.ts` de NestJS para usar Postgres en producción.

### 2. Despliegue del Frontend (Vercel o Netlify)
1. En Vercel, crear un nuevo proyecto y conectarlo a la carpeta `client/` del repositorio de GitHub.
2. Vercel detectará automáticamente que es un proyecto de Vite/React.
3. Configurar una variable de entorno `VITE_API_URL` con la URL pública que te entregó Render en el paso anterior.
4. Modificar el archivo `services/api.ts` para que apunte a esta variable de entorno en lugar de `/api` (ej. `const API_URL = import.meta.env.VITE_API_URL || '/api';`).
5. Vercel realizará el build y entregará un enlace público HTTPS listo para usar.