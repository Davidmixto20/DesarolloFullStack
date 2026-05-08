const { Router } = require('express');
const { check } = require('express-validator');
const {
  getMaterias,
  getMateriaById,
  createMateria,
  updateMateria,
  deleteMateria
} = require('../controllers/materiaController');
const { validateFields } = require('../middlewares/validation');

const router = Router();

router.get('/', getMaterias);
router.get('/:id', getMateriaById);

router.post('/', [
  check('nombre', 'El nombre es obligatorio').notEmpty(),
  check('descripcion', 'La descripción es obligatoria').notEmpty(),
  validateFields
], createMateria);

router.put('/:id', [
  check('nombre', 'El nombre es obligatorio').notEmpty(),
  check('descripcion', 'La descripción es obligatoria').notEmpty(),
  validateFields
], updateMateria);

router.delete('/:id', deleteMateria);

module.exports = router;
