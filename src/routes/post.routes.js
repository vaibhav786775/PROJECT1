const express = require("express")
const { postController, getPostController , getPostDetails} = require("../controllers/post.controllers")
const postRouter = express.Router()
const multer = require("multer")
const upload = multer({storage : multer.memoryStorage()})

//  post creat karni h 
//  isme req.body me { caption  , image-file}  aaegi 
// upload.single("img"),
//  multer ki vajah se ye buffer ki format me file aa jati hai 
//  ye as a middle ware use ho rha hai


postRouter.post("/" ,upload.single("image"), postController )
postRouter.get('/',getPostController)

postRouter.get('details/:postId', getPostDetails )

module.exports = postRouter