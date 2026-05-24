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

## GitHub Actions y Render

El workflow `.github/workflows/ci-render.yml` instala dependencias, ejecuta tests, calcula cobertura, construye una imagen Docker y lanza el despliegue en Render si todo pasa.

Para activar el despliegue automatico, crea en GitHub el secret:

```text
RENDER_DEPLOY_HOOK_URL
```

Su valor debe ser el deploy hook de tu servicio en Render.

En Render configura:

- Build Command: `npm ci`
- Start Command: `npm start`
- Health Check Path: `/health`
- Environment Variable: `MONGODB_URI` o `MONGO_URL`
