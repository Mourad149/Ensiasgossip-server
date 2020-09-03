const database=require('../Util/database')
const mongoDb = require('../index')
const ObjectId = require('mongodb').ObjectId;

class CommentNotif {
  constructor(comment,commentName,commentImage,id,userId,type,postText,room,posterId){
    this.profilImage=commentImage;
    this.name=commentName;
    this.id=id;
    this.comment=comment;
    this.userId=userId;
    this.text=postText;
    this.type=type;
    this.room=room;
    this.posterId=posterId
    this.date=Date.now()


  }
  save(){
  const db = mongoDb.mongoDb.then((val)=>{
    return   val
            .collection('notifications')
            .insertOne(this)
            .then(result=>{
              console.log(" comment notif inserted")
            })
            .catch(err=>{
              console.log(err)

            })
  })
      return db

}

}
module.exports=CommentNotif
