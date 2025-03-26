const express = require('express');
const router = express.Router();
require('dotenv').config();

const authRouter = require("./api/auth");
const userRouter = require("./api/users");

router.use(`${process.env.BASE_URL}/users`, userRouter); 

router.use( process.env.BASE_URL, authRouter );

module.exports = router;