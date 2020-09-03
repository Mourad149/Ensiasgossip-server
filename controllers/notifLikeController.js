const NotifLike= require('../models/NotifLike');
const mongoDb = require('../index');


const addNotifLike = (profilImage,name,postId,userId,postText,type,room,posterId)=>{

const notifLike=new NotifLike(profilImage,name,postId,postText,userId,type,room,posterId)

notifLike
  .save()
  .then(result=>{
    console.log("notif like saved")


  })
  .catch(err=>{
    console.log(err)
  })

}
exports.addNotifLike=addNotifLike;
