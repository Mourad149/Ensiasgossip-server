const database=require('../Util/database')
const mongoDb = require('../index')
const ObjectId = require('mongodb').ObjectId;

class Comment {
  constructor(commentImage,commentName,comment,id,aux,userId){
    this.profilImage=commentImage;
    this.name=commentName;
    this.comment=comment;
    this.id=id;
    this.userId=userId

  }
  save(postId){
    const id = ObjectId(postId)
    console.log(id)
  const db = mongoDb.mongoDb.then((val)=>{
    return   val
            .collection('posts')
            .update({_id:id},
            {$push : {comments:this} }
          )
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

module.exports=Comment;
