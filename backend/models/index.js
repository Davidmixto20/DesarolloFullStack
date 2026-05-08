const sequelize = require('../config/db');
const Materia = require('./Materia');
const Sesion = require('./Sesion');

Materia.hasMany(Sesion, { foreignKey: 'materiaId', as: 'sesiones', onDelete: 'CASCADE' });
Sesion.belongsTo(Materia, { foreignKey: 'materiaId', as: 'materia' });

module.exports = {
  sequelize,
  Materia,
  Sesion
};
