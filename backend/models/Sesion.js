const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Sesion = sequelize.define('Sesion', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  materiaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: { msg: 'Debe ser una fecha válida' }
    }
  },
  duracion: {
    type: DataTypes.INTEGER, // duración en minutos
    allowNull: false,
    validate: {
      isInt: { msg: 'La duración debe ser un número entero' },
      min: { args: [1], msg: 'La duración debe ser mayor a 0' }
    }
  },
  completado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  timestamps: false,
  tableName: 'sesiones'
});

module.exports = Sesion;
