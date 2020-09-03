const database=require('../Util/database')
const mongoDb = require('../index')
const ObjectId = require('mongodb').ObjectId;

class NotifLike {
  constructor(profilImage,name,postId,postText,userId,type,room,posterId){
    this.profilImage=profilImage;
    this.name=name;
    this.id=postId;
    this.postText=postText;
    this.userId=userId;
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
              console.log(" like notif inserted")
            })
            .catch(err=>{
              console.log(err)

            })
  })
      return db

}

}
module.exports=NotifLike
