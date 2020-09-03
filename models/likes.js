const database=require('../Util/database')
const mongoDb = require('../index')
const ObjectId = require('mongodb').ObjectId;

class Likes {
  constructor(likes){
    this.likes=likes
  }

  save(postId){
    const id = ObjectId(postId)
    console.log(id)
  const db = mongoDb.mongoDb.then((val)=>{
    return   val
            .collection('posts')
            .update({_id:id},
            {$set: {likes:this.likes} }
          )
            .then(result=>{
              console.log(" likes inserted")
            })
            .catch(err=>{
              console.log(err)

            })
  })
      return db

}
saveId(postId,userId){
  const id = ObjectId(userId)

  const db = mongoDb.mongoDb.then((val)=>{
    return   val
            .collection('users')
            .update({_id:id},
            {$push: {likedPosts:postId} }
          )
            .then(result=>{
              console.log(" liked post inserted")
            })
            .catch(err=>{
              console.log(err)

            })
  })
      return db
}
removeId(postId,userId){
  const id = ObjectId(userId)

  const db = mongoDb.mongoDb.then((val)=>{
    return   val
            .collection('users')
            .update({_id:id},
            {$pull: {likedPosts:postId} }
          )
            .then(result=>{
              console.log(" liked post removed")
            })
            .catch(err=>{
              console.log(err)

            })
  })
      return db
}
}
module.exports=Likes
