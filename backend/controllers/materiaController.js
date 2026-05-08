const { Materia, Sesion } = require('../models');

// GET /materias
const getMaterias = async (req, res, next) => {
  try {
    const materias = await Materia.findAll();
    res.status(200).json(materias);
  } catch (error) {
    next(error);
  }
};

// GET /materias/:id
const getMateriaById = async (req, res, next) => {
  try {
    const materia = await Materia.findByPk(req.params.id, {
      include: [{ model: Sesion, as: 'sesiones' }]
    });
    if (!materia) return res.status(404).json({ error: 'Materia no encontrada' });
    res.status(200).json(materia);
  } catch (error) {
    next(error);
  }
};

// POST /materias
const createMateria = async (req, res, next) => {
  try {
    const { nombre, descripcion } = req.body;
    const nuevaMateria = await Materia.create({ nombre, descripcion });
    res.status(201).json(nuevaMateria);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: error.errors.map(e => e.message) });
    }
    next(error);
  }
};

// PUT /materias/:id
const updateMateria = async (req, res, next) => {
  try {
    const materia = await Materia.findByPk(req.params.id);
    if (!materia) return res.status(404).json({ error: 'Materia no encontrada' });

    const { nombre, descripcion } = req.body;
    await materia.update({ nombre, descripcion });
    res.status(200).json(materia);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: error.errors.map(e => e.message) });
    }
    next(error);
  }
};

// DELETE /materias/:id
const deleteMateria = async (req, res, next) => {
  try {
    const materia = await Materia.findByPk(req.params.id);
    if (!materia) return res.status(404).json({ error: 'Materia no encontrada' });

    await materia.destroy();
    res.status(200).json({ message: 'Materia eliminada correctamente' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMaterias,
  getMateriaById,
  createMateria,
  updateMateria,
  deleteMateria
};
