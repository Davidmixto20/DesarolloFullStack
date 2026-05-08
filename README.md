# Sistema de Gestión de Rutinas de Estudio Inteligente

Este proyecto es una aplicación Full-Stack para gestionar rutinas de estudio de manera inteligente. Permite crear materias, asignar sesiones de estudio, marcar sesiones como completadas y realizar un seguimiento general del progreso.

## Arquitectura

El proyecto está dividido en dos partes principales para permitir su despliegue independiente (por ejemplo, en Render):

- **Backend (`/backend`)**: Una API RESTful construida con Node.js, Express y Sequelize que se conecta a una base de datos MySQL (Aiven).
- **Frontend (`/frontend`)**: Una aplicación cliente renderizada desde el servidor con Node.js, Express y EJS. Consume la API REST y usa Bootstrap 5 para el diseño.

---

## Requisitos Previos

- **Node.js** (v16 o superior recomendado)
- **MySQL** (Local o en Aiven)

---

## Configuración e Instalación

### 1. Clonar el repositorio

```bash
git clone <ENLACE_DE_TU_REPOSITORIO>
cd DesarolloFullStack
```

### 2. Configurar y levantar el Backend (API REST)

1. Ve a la carpeta del backend:
   ```bash
   cd backend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura las variables de entorno. Crea un archivo `.env` en `backend/` con el siguiente contenido (reemplaza con tus credenciales de MySQL):
   ```env
   PORT=4000
   DB_HOST=tu_host_de_aiven_o_localhost
   DB_PORT=tu_puerto_de_db
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=nombre_de_la_base_de_datos
   ```
4. Inicia el servidor del backend:
   ```bash
   npm start
   ```
   *Nota: Sequelize sincronizará automáticamente las tablas en la base de datos al arrancar por primera vez.*

### 3. Configurar y levantar el Frontend (Cliente EJS)

1. Abre una nueva terminal y ve a la carpeta del frontend:
   ```bash
   cd frontend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura las variables de entorno. Crea un archivo `.env` en `frontend/`:
   ```env
   PORT=3000
   API_URL=http://localhost:4000
   ```
4. Inicia el servidor frontend:
   ```bash
   npm start
   ```
5. Abre en tu navegador `http://localhost:3000`.

---

## Documentación de la API

El backend expone los siguientes endpoints:

### Materias

- `GET /materias` - Lista todas las materias.
- `GET /materias/:id` - Obtiene una materia por ID.
- `POST /materias` - Crea una nueva materia.
  - Body de ejemplo: `{ "nombre": "Matemáticas", "descripcion": "Cálculo I" }`
- `PUT /materias/:id` - Actualiza una materia existente.
- `DELETE /materias/:id` - Elimina una materia.

### Sesiones

- `GET /sesiones` - Lista todas las sesiones (soporta filtros `?completado=true` o `?fecha=YYYY-MM-DD`).
- `GET /sesiones/:id` - Obtiene una sesión por ID.
- `POST /sesiones` - Crea una sesión de estudio.
  - Body de ejemplo: `{ "materiaId": 1, "fecha": "2026-05-10", "duracion": 120 }`
- `PATCH /sesiones/:id` - Actualiza parcialmente una sesión (ej. marcarla como completada).
  - Body de ejemplo: `{ "completado": true }`
- `DELETE /sesiones/:id` - Elimina una sesión de estudio.

---

## Despliegue en Render

Para desplegar en Render, deberás crear **dos "Web Services"** conectando el mismo repositorio de GitHub:

1. **Web Service Backend**:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - *Añade las variables de entorno de tu base de datos Aiven.*
2. **Web Service Frontend**:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - *Añade la variable de entorno `API_URL` apuntando a la URL generada para tu Web Service Backend.*
