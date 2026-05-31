const express = require("express")
const { loginController, registerController } = require("../controllers/auth.controllers")

const authRouter = express.Router()


authRouter.post('/register', registerController  )

authRouter.post('/login', loginController )



module.exports = authRouter