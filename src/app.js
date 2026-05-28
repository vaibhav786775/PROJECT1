const express = require("express")
const app = express()
app.use(express.json())
const cookieParser = require("cookie-parser")
const authRouter = require("./routes/auth.routes")
app.use(cookieParser())

app.use("/api/auth" , authRouter)

module.exports = app