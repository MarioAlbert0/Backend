const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController"); // Importamos el controlador

// 📌 Rutas CRUD para Usuarios
router.post("/", userController.createUser); // Crear usuario
router.get("/", userController.getUsers); // Obtener todos los usuarios
router.get("/:id", userController.getUserById); // Obtener un usuario por ID
router.put("/:id", userController.updateUser); // Actualizar un usuario
router.delete("/:id", userController.deleteUser); // Eliminar un usuario

module.exports = router;
