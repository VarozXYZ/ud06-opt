# UD06 OPT API

API basica con Node.js, Express, MongoDB, logs y tests automatizados.

## Requisitos

- Node.js 20 o superior
- MongoDB local o una base MongoDB Atlas

## Configuracion

```bash
cp .env.example .env
npm install
```

Edita `.env` si necesitas cambiar `MONGODB_URI`.

## Scripts

```bash
npm run dev
npm start
npm test
npm run test:coverage
```

## Rutas

- `GET /` estado basico de la API.
- `GET /health` comprueba API y conexion con MongoDB.
- `GET /api/tasks` lista tareas.
- `POST /api/tasks` crea una tarea con `{ "title": "Texto" }`.
