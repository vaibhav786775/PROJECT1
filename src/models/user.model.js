/*
user =>{
  username , 
  email , 
  password , 
  bio , 
  followers , 
  profile_image
  }
*/
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true,"User name is required"],
    unique: [true,"user name already exist"],
    trim: true
  },
  email: {
    type: String,
    required: [true,"User name is required"],
    unique: [true,"user name already exist"],
    trim: true
  },
  password: {
    type: String,
    required: [true,"User name is required"]
  },
  bio: String , 
  pofileImage :{
    type :  String,
    default : "https://www.dreamstime.com/illustration/default-user.html"
    }
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel