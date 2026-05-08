const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Materia = sequelize.define('Materia', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'El nombre no puede estar vacío' }
    }
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'La descripción no puede estar vacía' }
    }
  }
}, {
  timestamps: false,
  tableName: 'materias'
});

module.exports = Materia;
