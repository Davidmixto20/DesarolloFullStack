require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { sequelize } = require('./models');
const { errorHandler } = require('./middlewares/validation');

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rutas base
app.get('/', (req, res) => res.json({ message: 'API de Gestión de Rutinas de Estudio Inteligente' }));

// Rutas de la API
app.use('/materias', require('./routes/materias'));
app.use('/sesiones', require('./routes/sesiones'));

// Middleware centralizado de errores
app.use(errorHandler);

// Conexión a Base de Datos y Arranque del Servidor
sequelize.sync({ force: false }) // false para no borrar las tablas existentes
  .then(() => {
    console.log('Base de datos conectada y sincronizada correctamente.');
    app.listen(PORT, () => {
      console.log(`Servidor Backend ejecutándose en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error al sincronizar la base de datos:', err);
  });
