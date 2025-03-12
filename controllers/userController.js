const UserModel = require("../models/User"); // Importa el modelo de usuario

// 📌 Crear un nuevo usuario (Create)
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Todos los campos son obligatorios." });
    }

    const newUser = await UserModel.create({ name, email, password });

    return res.status(201).json({ mensaje: "Usuario creado", user: newUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// 📌 Obtener todos los usuarios (Read)
const getUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// 📌 Obtener un usuario por ID (Read)
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// 📌 Actualizar un usuario (Update)
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const user = await UserModel.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;

    await user.save();

    return res.status(200).json({ mensaje: "Usuario actualizado", user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// 📌 Eliminar un usuario (Delete)
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    await user.destroy();

    return res.status(200).json({ mensaje: "Usuario eliminado" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Exportar las funciones para usarlas en las rutas
module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};
