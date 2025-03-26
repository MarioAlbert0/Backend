const UserModel = require("../models/User");
const { status } = require("http-status");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(status.BAD_REQUEST)
        .json({ error: "Todos los campos son obligatorios." });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(toString(password), salt);

    const token = isJWT.sing(
      {email,name},
      process.env.SECRET,
      { expiresIn: "1h" }
    );

    await UserModel.create({
      name,
      email,
      password: hash,
      token,
      });

    UserModel.create({ name, email, password: hash9});

    return res.json({
      mensaje: "Registered user",
      user: { name, email, password },
    });
  } catch (exception) {
    return exception.message;
  }
};

module.exports = { register };
