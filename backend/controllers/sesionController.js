const { Sesion, Materia } = require('../models');
const { Op } = require('sequelize');

// GET /sesiones
const getSesiones = async (req, res, next) => {
  try {
    const { completado, fecha } = req.query;
    const whereClause = {};

    if (completado !== undefined) {
      whereClause.completado = completado === 'true';
    }
    if (fecha) {
      whereClause.fecha = fecha;
    }

    const sesiones = await Sesion.findAll({ 
      where: whereClause,
      include: [{ model: Materia, as: 'materia' }]
    });
    res.status(200).json(sesiones);
  } catch (error) {
    next(error);
  }
};

// GET /sesiones/:id
const getSesionById = async (req, res, next) => {
  try {
    const sesion = await Sesion.findByPk(req.params.id, {
      include: [{ model: Materia, as: 'materia' }]
    });
    if (!sesion) return res.status(404).json({ error: 'Sesión no encontrada' });
    res.status(200).json(sesion);
  } catch (error) {
    next(error);
  }
};

// POST /sesiones
const createSesion = async (req, res, next) => {
  try {
    const { materiaId, fecha, duracion, completado } = req.body;
    
    const materia = await Materia.findByPk(materiaId);
    if (!materia) return res.status(404).json({ error: 'La materia indicada no existe' });

    const nuevaSesion = await Sesion.create({ materiaId, fecha, duracion, completado });
    res.status(201).json(nuevaSesion);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: error.errors.map(e => e.message) });
    }
    next(error);
  }
};

// PATCH /sesiones/:id
const updateSesion = async (req, res, next) => {
  try {
    const sesion = await Sesion.findByPk(req.params.id);
    if (!sesion) return res.status(404).json({ error: 'Sesión no encontrada' });

    const { fecha, duracion, completado } = req.body;
    if (fecha !== undefined) sesion.fecha = fecha;
    if (duracion !== undefined) sesion.duracion = duracion;
    if (completado !== undefined) sesion.completado = completado;

    await sesion.save();
    res.status(200).json(sesion);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: error.errors.map(e => e.message) });
    }
    next(error);
  }
};

// DELETE /sesiones/:id
const deleteSesion = async (req, res, next) => {
  try {
    const sesion = await Sesion.findByPk(req.params.id);
    if (!sesion) return res.status(404).json({ error: 'Sesión no encontrada' });

    await sesion.destroy();
    res.status(200).json({ message: 'Sesión eliminada correctamente' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSesiones,
  getSesionById,
  createSesion,
  updateSesion,
  deleteSesion
};
