# Sistema de Gestión de Tareas - Fullstack

Esta aplicación es una solución Fullstack desarrollada para gestionar tareas internas de un equipo técnico. Permite a los usuarios autenticados administrar sus propias tareas de forma segura y eficiente.

## 🚀 Enlaces del Proyecto

* **Aplicación en vivo (Frontend):** [https://prueba-tecnica-fullstack-rho.vercel.app/](https://prueba-tecnica-fullstack-rho.vercel.app/)
* **Repositorio de Código:** [https://github.com/jhust17/prueba-tecnica-fullstack](https://github.com/jhust17/prueba-tecnica-fullstack)

> **Nota importante sobre el despliegue:** Debido al uso de la capa gratuita de Render para el Backend, el servidor entra en estado de reposo tras 15 minutos de inactividad. La primera petición (Login) puede tardar entre 40 y 60 segundos en responder mientras el servicio se reactiva. Una vez encendido, la navegación es fluida.

## 🛠️ Tecnologías Utilizadas

**Frontend:**
* **React + TypeScript:** Construcción de la interfaz de usuario (SPA).
* **Vite:** Herramienta de empaquetado y servidor de desarrollo ultrarrápido.
* **Tailwind CSS v3:** Framework de utilidades para un diseño moderno y responsivo.
* **React Router DOM:** Manejo de rutas y protección de vistas privadas.

**Backend:**
* **NestJS + Node.js + TypeScript:** Framework principal para la construcción de una API REST escalable.
* **TypeORM:** Mapeo objeto-relacional (ORM) para interactuar con la base de datos.
* **SQLite 3:** Motor de base de datos relacional ligero.
* **JWT (JSON Web Tokens) & Bcrypt:** Autenticación segura y encriptación de contraseñas.

## 🏗️ Descripción General y Arquitectura

La solución se construyó utilizando un enfoque de **arquitectura desacoplada**:
1. **Capa Backend (API REST):** Desarrollada con NestJS, gestiona la lógica de negocio y expone endpoints protegidos. Implementa un `AuthGuard` para validar tokens JWT.
2. **Capa de Persistencia:** Utiliza TypeORM con SQLite. Incluye un sistema de *Database Seeding* (`onModuleInit`) que garantiza la existencia de usuarios de prueba incluso si la base de datos se reinicia en el entorno de producción.
3. **Capa Frontend (SPA):** Desarrollada en React, gestiona el estado de autenticación y consume la API de forma asíncrona, ofreciendo una experiencia de usuario sin recargas.

## 👤 Experiencia del Usuario Final

1. **Acceso Seguro:** Interfaz de Login protegida.
2. **Dashboard Aislado:** Cada usuario visualiza y gestiona **exclusivamente sus propias tareas**.
3. **Gestión Completa (CRUD):** Creación, edición y eliminación de tareas con campos de título, descripción, prioridad y fecha de vencimiento.
4. **Filtros Dinámicos:** Filtrado inmediato por estado (Pendiente, En Progreso, Completada).
5. **Cierre de Sesión:** Gestión segura del token de acceso para finalizar la sesión.

## 🔐 Credenciales de Acceso de Prueba

El sistema genera automáticamente estos usuarios para facilitar la evaluación:

* **Usuario:** `admin` | **Contraseña:** `admin123`
* **Usuario:** `tester` | **Contraseña:** `test1234`
* **Usuario:** `developer` | **Contraseña:** `dev2024`