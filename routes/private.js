const express = require('express');
const router = express.Router();
require('dotenv').config();

const userRouter = require("./api/users"); // Importamos las rutas CRUD de usuarios

router.use(`${process.env.BASE_URL}/users`, userRouter); // Agregamos la nueva ruta de usuarios

module.exports = router;