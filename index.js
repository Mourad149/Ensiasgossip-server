const express = require('express');
const socketio =require('socket.io');
const http = require('http');
const bodyParser = require("body-parser");
const PORT =process.env.PORT || 5000
const router= require('./router')
const {addUser,removeUser,getUser,getUsersInRoom}= require('./users.js')
var cors = require('cors')
const addMessage=require('./controllers/messagesController')
const MongoDb=require('./util/database')
const commentsController = require('./controllers/commentsController')
const likesController = require('./controllers/likesController')
const postController=require('./controllers/postController')
const notifLikeController=require('./controllers/notifLikeController')
const commentNotifController = require('./controllers/commentNotifController')
const userController = require('./controllers/userController')
const postNotifController = require('./controllers/postNotifController')
const eventController = require('./controllers/eventController')
const cookieParser = require('cookie-parser');



const app= express();
  app.use(cors())



  const server = app.listen(5000,()=> console.log(`Server has started on ${5000}`));
const mongoDb=new MongoDb()
app.use(cookieParser());

  const io = socketio(server)


io.of('/N').on('connect', (socket)=>{

  socket.on('join', ({Name,Room,image},callback)=>{

    socket.join(Room);
    callback();
  });

  socket.on('sendMessage',(data,callback)=>{
    io.of('/N').to(data.Room).emit('message',{user:data.Name,text:data.message,room:data.Room,image:data.image,userId:data.userId,msgImage:data.msgImage})
    addMessage.addMessage(data.Name,data.message,data.Room,data.image,data.userId,data.msgImage)
    callback();
  });
socket.on('disconnect', function(){
   console.log("user has disconnected");
socket.disconnect(); })
});
let comment
io.of('/comments').on('connection', socket => {

  socket.on('join', (data,callback)=>{

    socket.join(data.postId);
    callback();
  });
  let roomComm;
  socket.on('joinComm',(data,callback)=>{

     roomComm=data.room
    socket.join(data.room);
    callback();
  });
  socket.on("addComment", (data,callback)=>{
    io.of("/comments").to(data.id).emit("SendBackComm",data)
    commentsController.addComment(data.comment,data.name,data.profilImage,data.id,data.aux,data.userId)
    commentNotifController.addCommentNotif(data.comment,data.name,data.profilImage,data.id,data.userId,data.type,data.text,data.room,data.posterId)

    io.of('/comments').to(roomComm).emit('receiveComm', data);
    callback()
  })
  let roomLike;
  socket.on('joinLike',(data,callback)=>{

     roomLike=data.room
    socket.join(data.room);
    callback();
  });
  socket.on("addLike", (data)=>{

    likesController.addLikes(data.likes,data.id,data.userId)

    if(data.remove===true){
      likesController.removeLikes(data.likes,data.id,data.userId)
    }else if (data.remove===false) {
      notifLikeController.addNotifLike(data.profilImage,data.name,data.id,data.userId,data.postText,data.type,roomLike,data.posterId)
      Object.assign(data,{room:roomLike})
      io.of('/comments').to(roomLike).emit('receiveLike',data);

    }

      io.of("/comments").to(data.id).emit("SendBackLikes",data)
  })
  socket.on( 'disconnect', function () {

  } );

});
io.of('/Post').on('connection', socket => {
  let room;
  socket.on('join',(data,callback)=>{

     room=data.room
    socket.join(data.room);
    callback();
  });
  socket.on("addPost", (data,callback)=>{
    postController.addPost(data,room)
    postNotifController.addPostNotif(data.text,data.profilImage,data.file,data.name,data.userId,data.type,room)
    Object.assign(data,{room:room})
    io.of('/Post').to(room).emit('receivePost', data);
  })
  socket.on( 'disconnect', function () {
    console.log( 'disconnected to server' );
} );
});
io.of('/Banne').on('connection', socket => {
  socket.on('joinMine',(data,callback)=>{

    socket.join(data.userId);
    userToBanne=data.userId
    console.log("joinMine",data.userId)
    callback()
  });
  socket.on('joinUser',(data,callback)=>{

    socket.join(data.id);
    console.log("joined",data.id)
    callback();
  });
  socket.on("banneUser",(data,callback)=>{
        userController.banneUser(data.id,data.status)
        if (data.status===1) {
          io.of('/Banne').to(data.id).emit("Banned")
        }
        callback()
  })

} );
io.of('/Event').on('connection', socket => {
  socket.on('joinEvent',(data,callback)=>{

    socket.join(data.room);
    console.log("joinEvent",data.room)
    callback()
  });

  socket.on("Participate",(data,callback)=>{
        eventController.insertEventParticipant(data.userId,data.eventId,data.userName,data.image)
        callback()
  })
  socket.on("SportParticipate1",(data,callback)=>{
        eventController.insertEventTeamParticipant(1,data.userId,data.eventId,data.userName,data.image)
        callback()
  })
  socket.on("SportParticipate2",(data,callback)=>{
        eventController.insertEventTeamParticipant(2,data.userId,data.eventId,data.userName,data.image)
        callback()
  })

} );

app.use(bodyParser.json({limit: '50mb'}));

app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: '50mb'
  })
);




 app.use(router);

exports.mongoDb=mongoDb.mongoPoolPromise();
exports.io=io
