const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");


async function followUserController(req,res){
  const followerUsername = req.user.username
  const followeeUsername = req.params.username

  const isFolloweeExists = await userModel.
  findOne({
    username : followeeUsername
  })

  if(!isFolloweeExists){
    return res.status(404).json({
      message : "You are trying to follow does not exist"
    })
  }

  if(followerUsername === followeeUsername){
    return res.status(400).json({
      message : "You cannot follow yourself :)"
    })
  }

  const isAlreadyFollowing = await followModel.findOne({
    followee: followeeUsername,
    follower : followerUsername
  })

  if(isAlreadyFollowing){
    return res.status(200).json({
      message : `You are already following ${followeeUsername}`,
      follows : isAlreadyFollowing
    })
  }

  const followRecord = await followModel.create({
    follower : followerUsername, 
    followee: followeeUsername
  })
 
  res.status(201).json({
    message : `You are now following ${followeeUsername}`,
    follows : followRecord
  }) 
}

async function unfollowUserController(req,res){
  const followerUsername = req.user.username
  const followeeUsername = req.params.username

  const isFolloweeExists = await userModel.findOne({
    username : followeeUsername
  })

  if(!isFolloweeExists){
    return res.status(404).json({
      message : "You are trying to unfollow does not exist"
    })
  }

  if(followerUsername === followeeUsername){
    return res.status(400).json({
      message : "You cannot unfollow yourself :)"
    })
  }

  const isAlreadyFollowing = await followModel.findOne({
    followee: followeeUsername,
    follower : followerUsername
  })

  if(!isAlreadyFollowing){
    return res.status(200).json({
      message : `You are already not following ${followeeUsername}`,
      follows : isAlreadyFollowing
    })
  }

  await followModel.findByIdAndDelete(isAlreadyFollowing._id)
  



  res.status(201).json({
    message : `You have unfollowed  ${followeeUsername}`
  }) 
}

module.exports = {
  followUserController , 
  unfollowUserController
}