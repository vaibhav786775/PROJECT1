const postModel = require("../models/post.model")
const ImageKit  = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken") 

const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
})

async function postController (req,res){

  console.log(req.body , req.file)

  const token  = await req.cookies.token

  if(!token){
    return res.status(401).json({
      message : "user is not authorised"
    })
  }

  let decoded = "";
  try{
    decoded = jwt.verify(token , process.env.JWT_SECRET)
  }catch(err){
    return res.status(401).json({
      message : "user not authorized"
    })
  }

  //  isme if condition use nhi kar skte ......

  const file = await imageKit.files.upload({
    file : await  toFile(Buffer.from(req.file.buffer),'file'),
    fileName : "Test",
    folder : "cohort-2-insta_clone"
  })

  const post = await postModel.create({
    caption : req.body.caption , 
    imgUrl : file.url , 
    user : decoded.id
  })

  res.status(201).json({
    message : "Post created succesfully", 
    post
  })
}

async function getPostController(req,res){

  const token = req.cookies.token

  if(!token){
    return res.status(401).json({
      message : "User is not authorised"
    })
  }

  let decoded = ""
  try {
    decoded = await jwt.verify(token , process.env.JWT_SECRET)

  } catch (err) {
    return res.status(401).json({
      message : "User is not authorised"
    })
  }

  const userId = decoded.id
  const posts = await postModel.find({
    user : userId
  })

  res.status(200).json({
    message : "post fetched succesfuly" , 
    posts
  })
}

/**
  get /api/posts/details/:postid
  return an detail abput specific post with the id and also check wheter the post belongs to the user that is requesting
 */

async function getPostDetails(req,res){
  const token = req.cookies.token

  if(!token){
    return res.status(401).json({
      message : "user not authorised"
    })
  }

  let decoded = ""
  try {
    decoded = await jwt.verify(token , process.env.JWT_SECRET)
  } catch (err) {
    return res.status(401).json({
      message : "Invalid user"
    })
  }

  const userId = decoded.id
  const postId = req.params.postId

  const post = await postModel.findById(postId)

  if(!post){
    return res.status(404).json({
      message : "post not found"
    })
  }

  const isValid = (post.user===userId)
  if(!isValid){
    return res.status(401).json({
      message : "Invalid access"
    })
  }

  return res.status(200).json({
    message : "post fetched"
  })
}

module.exports = {
  postController , 
  getPostController,
  getPostDetails
}