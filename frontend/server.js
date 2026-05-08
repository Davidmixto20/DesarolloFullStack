require('dotenv').config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Pasamos la URL de la API a las vistas (útil para cuando se despliegue en Render)
app.use((req, res, next) => {
  res.locals.API_URL = process.env.API_URL || 'http://localhost:4000';
  next();
});

// Rutas de las vistas
app.get('/', (req, res) => {
  res.render('index', { title: 'Dashboard - Rutinas de Estudio' });
});

app.get('/materias', (req, res) => {
  res.render('materias', { title: 'Gestión de Materias' });
});

app.get('/sesiones', (req, res) => {
  res.render('sesiones', { title: 'Gestión de Sesiones' });
});

app.listen(PORT, () => {
  console.log(`Frontend server (EJS) running on port ${PORT}`);
});
