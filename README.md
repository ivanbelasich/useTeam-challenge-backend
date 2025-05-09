# Backend - API Kanban

API REST para el tablero Kanban construida con NestJS, MongoDB y WebSockets.

## Demo

El frontend está desplegado en: [https://use-team-challenge.vercel.app/](https://use-team-challenge.vercel.app/)

## Requisitos

- Node.js 18 o superior
- MongoDB
- npm o yarn
- Docker (opcional)

## Instalación

1. Clona el repositorio
2. Instala las dependencias:
```bash
npm install
# o
yarn install
```

## Configuración

1. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
MONGODB_URI=mongodb://localhost:27017/kanban
PORT=4001
```

## Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run start:dev
# o
yarn start:dev
```

La API estará disponible en [http://localhost:4001](http://localhost:4001)

## Docker

### Usando Docker Compose (recomendado)

1. Asegúrate de tener Docker y Docker Compose instalados
2. Ejecuta:
```bash
docker-compose up -d
```

Esto levantará:
- MongoDB en el puerto 27017
- La API en el puerto 4001

```

## Características

- API REST para gestión de tareas
- WebSockets para actualizaciones en tiempo real
- Integración con MongoDB
- CORS configurado
- Validación de datos
- Manejo de errores

## Endpoints

### Tareas

- `GET /tasks` - Obtener todas las tareas
- `POST /tasks` - Crear una nueva tarea
- `PUT /tasks/:id` - Actualizar una tarea
- `DELETE /tasks/:id` - Eliminar una tarea

### WebSocket

- `cardMoved` - Evento emitido cuando una tarea cambia de estado
- `taskCreated` - Evento emitido cuando se crea una tarea
- `taskUpdated` - Evento emitido cuando se actualiza una tarea
- `taskDeleted` - Evento emitido cuando se elimina una tarea

## Tecnologías

- NestJS
- TypeScript
- MongoDB
- Socket.io
- Mongoose
- Docker
