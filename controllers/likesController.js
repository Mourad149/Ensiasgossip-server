const Likes= require('../models/Likes');
const mongoDb = require('../index');


const addLikes = (like,postId,userId)=>{
  const likes=like

const Like=new Likes(likes)

Like
  .save(postId)
  .then(result=>{
    console.log("like saved")


  })
  .catch(err=>{
    console.log(err)
  })
Like
    .saveId(postId,userId)
    .then(result=>{
      console.log("liked post saved")


    })
    .catch(err=>{
      console.log(err)
    })
}
const removeLikes=(likes,postId,userId)=>{
  const Like=new Likes(likes)
  Like
      .removeId(postId,userId)
      .then(result=>{
        console.log("liked post removed")


      })
      .catch(err=>{
        console.log(err)
      })
}
exports.addLikes=addLikes;
exports.removeLikes=removeLikes;
