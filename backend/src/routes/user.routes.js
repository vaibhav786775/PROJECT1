const express = require('express')
const { followUserController, unfollowUserController } = require('../controllers/user.controllers')
const { identifyUser } = require('../middleware/auth.middleware')
const userRouter = express.Router()



 //  post /api/users/follow/:userid 
//  follow a user

userRouter.post("/follow/:username", identifyUser , followUserController)

userRouter.post("/unfollow/:username", identifyUser , unfollowUserController)

module.exports = userRouter