const database=require('../Util/database')
const mongoDb = require('../index')


class Messages {
  constructor(name,text,room,image,userId,msgImage){
    this.text=text;
    this.name=name;
    this.room=room;
    this.profilImage=image
    this.userId=userId
    this.msgImage=msgImage
  }
  save(){

  const db = mongoDb.mongoDb.then((val)=>{
    return   val
            .collection('messages')
            .insertOne(this)
            .then(result=>{
              console.log("inserted")
            })
            .catch(err=>{
              console.log(err)

            })
  })
      return db

}
}
module.exports=Messages;
