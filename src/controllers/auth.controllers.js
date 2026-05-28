const crypto = require("crypto")
const jwt = require('jsonwebtoken')
const userModel = require("../models/user.model")

async function registerController (req,res){
  const {email , username,password,bio , profileImage} = req.body

  // const isUserByEmail = await userModel.findOne({email})

  // if(isUserByEmail){
  //   res.status(409).json({
  //     message : "user already Exist with email"
  //   })
  // }

  // const isUserByUsername = await userModel.findOne({username})
  // if(isUserByEmail){
  //   res.status(409).json({
  //     message : "user already Exist with username try another one"
  //   })
  // }

  const isUserExist = await userModel.findOne({
    $or:[
      {username},
      {email}
    ]
  })

  if(isUserExist){
    return res.status(409).json({
      message : "user already exist" + (isUserExist.email===email)? "email already exist " : "username already exist"
    })
  }

  const hash = crypto.createHash('sha256').update(password).digest('hex')

  const user = await userModel.create({
    email , 
    username,
    password : hash,
    bio , 
    profileImage
  }) 

  const token = await jwt.sign({
    // isem user ka data hona chahiye or unique hi ho 

    id: user._id
  }, process.env.JWT_SECRET, {expiresIn: "4d"})

  res.cookie("token", token)

  res.status(201).json({
    message : "user registered succesfully",
    user:{
      email : user.email,
      bio : user.bio,
      username: user.username,
      profileImage : user.profileImage
    }
  })
}

async function loginController (req,res){
  const {username,email ,password} = req.body

  const user = await userModel.findOne({
    $or:[
      {
        username: username
      },
      {
        email : email
      }
    ]
  })

  if(!user){
    return res.status(409).json({
      message : "user do not exist already exist" 
    })
  }

  const ismatch = (crypto.createHash('sha256').update(password).digest('hex')=== user.password)

  if(!ismatch){
    return res.status(404).json({
      message : "Incorrect credentials"
    })
  }
  
  

  const token = await jwt.sign({
    // isem user ka data hona chahiye or unique hi ho 
    id: user._id
  }, process.env.JWT_SECRET, {expiresIn: "4d"})

  res.cookie("token", token)

  res.status(201).json({
    message : "user logged in succesfully",
    user:{
      email : user.email,
      bio : user.bio,
      username: user.username,
      profileImage : user.profileImage
    }
  })
}

module.exports = {
  registerController , 
  loginController
}