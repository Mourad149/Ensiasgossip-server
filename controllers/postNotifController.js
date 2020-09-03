
const PostNotif= require('../models/PostNotif');
const mongoDb = require('../index');


const addPostNotif = (text,profilImage,file,name,userId,type,rm)=>{

const postNotif=new PostNotif(text,profilImage,file,name,userId,type,rm)

postNotif
  .save()
  .then(result=>{
    console.log("notif post saved")


  })
  .catch(err=>{
    console.log(err)
  })

}
exports.addPostNotif=addPostNotif;
