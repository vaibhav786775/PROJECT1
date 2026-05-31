const express = require("express")
const app = express()
app.use(express.json())
const cookieParser = require("cookie-parser")

app.use(cookieParser())

//  require routes
const authRouter = require("./routes/auth.routes")
const postRouter = require("./routes/post.routes")
const userRouter = require("./routes/user.routes")




app.use("/api/auth" , authRouter)
app.use("/api/posts" , postRouter)
app.use("/api/users", userRouter)

module.exports = app