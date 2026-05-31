require('dotenv').config()
const app = require("./src/app")
const connectDB = require("./src/config/database")
const cookieParser = require("cookie-parser");
app.use(cookieParser());

connectDB()
app.listen(3000,()=>{
  console.log(`server is running on the port 3000`)
})
