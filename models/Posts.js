const database=require('../Util/database')
const mongoDb = require('../index')

class Posts {
  constructor(text,profilImage,image,file,name,likes,userId,type,fileName,room){
    this.text=text;
    this.profilImage=profilImage;
    this.image=image;
    this.file=file;
    this.name=name;
    this.comments=[];
    this.likes=0;
    this.userId=userId;
    this.fileName=fileName
    this.type=type
    this.room=room
    this.date=Date.now()

  }
  save(){
    const db = mongoDb.mongoDb.then((val)=>{
      return   val
              .collection('posts')
              .insertOne(this)
              .then(result=>{
              })
              .catch(err=>{
                console.log(err)

              })
    })
        return db

  }

  }

module.exports=Posts;
