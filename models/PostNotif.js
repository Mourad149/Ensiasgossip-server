const database=require('../Util/database')
const mongoDb = require('../index')
const ObjectId = require('mongodb').ObjectId;

class PostNotif {
  constructor(text,profilImage,file,name,userId,type,room){
    this.profilImage=profilImage;
    this.name=name;
    this.text=text;
    this.userId=userId;
    this.file=file;
    this.type=type;
    this.room=room;
    this.date=Date.now()


  }

  save(){
  const db = mongoDb.mongoDb.then((val)=>{
    return   val
            .collection('notifications')
            .insertOne(this)
            .then(result=>{
              console.log(" post notif inserted")
            })
            .catch(err=>{
              console.log(err)

            })
  })
      return db

}

}
module.exports=PostNotif
