const { Router } = require('express');
const { check } = require('express-validator');
const {
  getSesiones,
  getSesionById,
  createSesion,
  updateSesion,
  deleteSesion
} = require('../controllers/sesionController');
const { validateFields } = require('../middlewares/validation');

const router = Router();

router.get('/', getSesiones);
router.get('/:id', getSesionById);

router.post('/', [
  check('materiaId', 'El ID de la materia es obligatorio y debe ser numérico').isInt(),
  check('fecha', 'La fecha es obligatoria').notEmpty(),
  check('fecha', 'Debe ser una fecha válida').isDate(),
  check('duracion', 'La duración es obligatoria').notEmpty(),
  check('duracion', 'La duración debe ser un número entero mayor a 0').isInt({ min: 1 }),
  validateFields
], createSesion);

router.patch('/:id', [
  check('fecha', 'Debe ser una fecha válida').optional().isDate(),
  check('duracion', 'La duración debe ser un número entero mayor a 0').optional().isInt({ min: 1 }),
  check('completado', 'Debe ser un valor booleano').optional().isBoolean(),
  validateFields
], updateSesion);

router.delete('/:id', deleteSesion);

module.exports = router;
