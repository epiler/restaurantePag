
const express = require('express');
const router = express.Router();

// Requerir el método controller
const controller = require('../controllers/controller')

router.get('/', controller.login);

// Rutas
//router.get('/', controller.login);
router.post('/login', controller.login_in);

//router.get('/register', controller.register);
router.post('/register', controller.save_register);

router.get('/cajero', controller.cajero);
router.post('/pedido', controller.pedido);

///outer.get('/list', controller.list);
router.get('/chef', controller.chef);
router.put('/preparando/:id', controller.preparando);
router.put('/listo/:id', controller.listo);

//router.get('/mesero', controller.mesero);
router.get('/mesero', controller.mesero);
router.put('/entregado/:id', controller.finalizado);







































































































module.exports = router;