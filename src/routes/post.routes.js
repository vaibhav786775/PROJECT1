const express = require("express")
const { postController, getPostController , getPostDetails, likePostController} = require("../controllers/post.controllers")
const postRouter = express.Router()
const multer = require("multer")
const { identifyUser } = require("../middleware/auth.middleware")
const upload = multer({storage : multer.memoryStorage()})

//  post creat karni h 
//  isme req.body me { caption  , image-file}  aaegi 
// upload.single("img"),
//  multer ki vajah se ye buffer ki format me file aa jati hai     
//  ye as a middle ware use ho rha hai

postRouter.post("/" ,upload.single("image"), identifyUser,postController )
postRouter.get('/',identifyUser,getPostController)

postRouter.get('/details/:postId', identifyUser,getPostDetails )

postRouter.post("/like/:postId", identifyUser ,
  likePostController
)

module.exports = postRouter