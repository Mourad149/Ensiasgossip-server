  const Comment = require('../models/Comment');
const mongoDb = require('../index')
const  server = require('../index').server
const socketio =require('socket.io');




const addComment = (text,name,image,id,aux,userId)=>{




const comm=new Comment(image,name,text,id,aux,userId);

console.log(comm)
    comm
      .save(id)
      .then(result=>{
        console.log("comment saved")


      })
      .catch(err=>{
        console.log(err)
      })
}
const updateUsersComments = (req,res,next)=>{

  const profilImage=req.body.image;
  const name=req.body.name;


  const id = req.params.id
  const db = mongoDb.mongoDb.then((val)=>{
    return   val
            .collection('posts')
            .updateMany(
            {},
           { $set: { "comments.$[elem].profilImage":profilImage,"comments.$[elem].name":name } },
           { arrayFilters: [ { "elem.userId": id} ],
             upsert: true
           }
          )
            .then(result=>{
              console.log(" user's comments' updated succesfuly")
            })
            .catch(err=>{
              console.log(err)

            })
  })
      return db
}
exports.addComment=addComment;
exports.updateUsersComments=updateUsersComments;
