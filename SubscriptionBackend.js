const express = require('express');
const socketio =require('socket.io');
const http = require('http');
const bodyParser = require("body-parser");
const PORT =process.env.PORT || 3000
const router= require('./router')
const {addUser,removeUser,getUser,getUsersInRoom}= require('./users.js')
const app= express();

const server = http.createServer(app)


app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.post("/formdata", function(req, res) {

  console.log("Hentet data");
});


 app.use(router);
server.listen(PORT,()=> console.log(`Server has started on ${PORT}`))
