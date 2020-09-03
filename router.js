const  express = require('express');
const router = express.Router();
const userController = require('./controllers/userController')
const postController = require('./controllers/postController')
const eventController = require('./controllers/eventController')
const notificationsController = require('./controllers/notificationsController')
const messagesController = require('./controllers/messagesController')
const multerUploads = require("./multer").multerUploads;
const dataUri=require("./multer").dataUri;
const  uploader=require("./cloudinaryConfig").uploader;
const cloudinaryConfig=require('./cloudinaryConfig').cloudinaryConfig
const withAuth = require('./jwtMiddleware');



const commentsController = require('./controllers/commentsController')
const  io = require('./index').io
const socketio =require('socket.io');

var cors = require('cors')



router.get('/',(req,res)=>{
  res.send('server is up and running')
});
router.post("/updatePost/:id",withAuth,postController.updatePost)
router.get("/getMessages/:skip/:room",withAuth,messagesController.getMessages)
router.post("/formdata", userController.addUsers);
router.post("/updateProfil/:id",withAuth,[userController.updateProfil,postController.updateUsersPost,notificationsController.updateUsersNotifications,messagesController.updateUsersMessages],commentsController.updateUsersComments);
router.get("/getUsers/:filiere/:niveau",withAuth, userController.getUsers);
router.get("/getUser/:id/",withAuth, userController.getUser);
router.get("/getEmailUsers/", userController.getEmailUsers);
router.post("/eventdata",withAuth, eventController.addEvent);
router.post("/login",userController.loginUsers)
router.post("/post",withAuth,postController.addPost)
router.post("/comments",commentsController.addComment)
router.get("/getPosts/:skip/:room",withAuth,postController.getPosts)
router.get("/post/:id",withAuth,postController.getPostFromNotif)
router.post("/deletePost/:id",withAuth,postController.deletePost)
router.get("/searchPosts/:skip/:search/:room/:type",withAuth,postController.searchPosts)
router.get("/getUserPosts/:skip/:id",withAuth,postController.getUserPosts)
router.get("/getEvents",withAuth,eventController.getEvents)
router.get('/checkToken', [withAuth, function(req, res) {
  console.log("oui ckecked")
  console.log(req.cookies)
  res.sendStatus(200);
}])
router.get("/getNotifs/:skip/:room/:id",notificationsController.getNotifications)
router.post('/upload', multerUploads, async (req, res) => {
  req.setTimeout(0)
  if(req.files) {
    let file=[];
      req.files.map(files=>{

        file.push({base64file:dataUri(files).content,fileName:files.originalname});
        console.log("done")

      })
        cloudinaryConfig()
      function  uploadFiles(file){
        const promise = new Promise((resolve,reject)=>{
          let finalFiles=[]

          file.map(finalfile=>{
                uploader.upload(finalfile.base64file,{resource_type:'raw'},console.log("lol"))
                      .then((result) => {
                        const image = result.url;
                        const filename=finalfile.fileName
                        finalFiles.push({image,filename})
                        console.log("done 1",finalFiles.length)
                        if(finalFiles.length===file.length)
                        {
                          console.log("done 2")
                          console.log(finalFiles.length)
                            resolve(finalFiles)
                          }
                        })
                        .catch((err) =>{
                          console.log(err)
                          reject(err)
                        })
          })
        })
        return promise

      }
      await uploadFiles(file).then(val=>{
        console.log(val)
        res.send(val)
      }
).catch((err)=>console.log(err))


                        }
      });





module.exports = router ;
