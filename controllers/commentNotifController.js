
const CommentNotif= require('../models/CommentNotif');
const mongoDb = require('../index');


const addCommentNotif = (comment,commentName,commentImage,id,userId,type,postText,room,posterId)=>{

const commentNotif=new CommentNotif(comment,commentName,commentImage,id,userId,type,postText,room,posterId)

commentNotif
  .save()
  .then(result=>{
    console.log("notif comment saved")


  })
  .catch(err=>{
    console.log(err)
  })

}
exports.addCommentNotif=addCommentNotif;
