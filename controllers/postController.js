const Posts = require('../models/Posts');
const mongoDb = require('../index');
const ObjectId = require('mongodb').ObjectId;

const addPost = (data,rm)=>{

  const text=data.text;
  const profilImage=data.profilImage;
  const image=data.image;
  const file=data.file;
  const name=data.name;
  const likes=data.likes;
  const userId=data.userId;
  const type=data.type
  const fileName=data.fileName
  const room=rm


const post=new Posts(text,profilImage,image,file,name,likes,userId,type,fileName,room);

console.log(post)
    post
      .save()
      .then(result=>{
        console.log("post saved")

        console.log(result)

      })
      .catch(err=>{
        console.log(err)
      })
}


const getPosts =(req,res,next)=>{


  mongoDb.mongoDb.then( (val)=>{
   return val
             .collection("posts")
             .find({room:req.params.room})
             .sort({_id:-1})
             .skip(parseInt(req.params.skip))
             .limit(5)
             .toArray()
             .then( (result)=>{
                res.json(result)
                console.log("return")

             })
             .catch(err=>{
               console.log(err)
             })
 })

}
const getPostFromNotif =(req,res,next)=>{
 const id = ObjectId(req.params.id)

  mongoDb.mongoDb.then( (val)=>{
   return val
             .collection("posts")
             .find({_id:id})
             .toArray()
             .then( (result)=>{
                res.json(result)
                console.log("post from notif return")

             })
             .catch(err=>{
               console.log(err)
             })
 })

}
const searchPosts =(req,res,next)=>{
console.log(req.params.search )
if(req.params.type==="post")
  {
    mongoDb.mongoDb.then( (val)=>{
   return val
             .collection("posts")
             .find({room:req.params.room,  $text: { $search: req.params.search }  })
             .sort({_id:-1})
             .skip(parseInt(req.params.skip))
             .limit(5)
             .toArray()
             .then( (result)=>{
                res.json(result)
                console.log("search result returned")

             })
             .catch(err=>{
               console.log(err)
             })
 })
}
else if (req.params.type==="file") {
  mongoDb.mongoDb.then( (val)=>{
 return val
           .collection("posts")
           .find({room:req.params.room,type:req.params.type,  $text: { $search: req.params.search }  })
           .sort({_id:-1})
           .skip(parseInt(req.params.skip))
           .limit(5)
           .toArray()
           .then( (result)=>{
              res.json(result)
              console.log("search result returned")

           })
           .catch(err=>{
             console.log(err)
           })
})
}
}
const getUserPosts =(req,res,next)=>{

  mongoDb.mongoDb.then( (val)=>{
   return val
             .collection("posts")
             .find({userId:req.params.id})
             .sort({_id:-1})
             .skip(parseInt(req.params.skip))
             .limit(5)
             .toArray()
             .then( (result)=>{

                res.json(result)
                console.log("return")

             })
             .catch(err=>{
               console.log(err)
             })
 })

}
const updateUsersPost = (req,res,next)=>{

  const profilImage=req.body.image;
  const name=req.body.name;


  const id = req.params.id
  const db = mongoDb.mongoDb.then((val)=>{
    return   val
            .collection('posts')
            .updateMany({userId:id},
            {$set:
               {
                 name:name,
                 profilImage:profilImage


               }
             }
          )
            .then(result=>{
              console.log(" user posts updated succesfuly")
            })
            .catch(err=>{
              console.log(err)

            })
  })
  next()
      return db
}
const updatePost = (req,res,next)=>{

  const file=req.body.file;
  const text=req.body.text;


  const id = ObjectId(req.params.id)
  const db = mongoDb.mongoDb.then((val)=>{
    return   val
            .collection('posts')
            .updateMany({_id:id},
            {$set:
               {
                 text:text,
                 file:file


               }
             }
          )
            .then(result=>{
              res.status(200).send()
              console.log("  post updated succesfuly")
            })
            .catch(err=>{
              console.log(err)
              res.status(400).send(err)


            })
  })
      return db
}
const deletePost = (req,res,next)=>{




  const id = ObjectId(req.params.id)
  const db = mongoDb.mongoDb.then((val)=>{
    return   val
            .collection('posts')
            .remove({_id:id})
            .then(result=>{
              res.status(200).send()
              console.log("  post removed succesfuly")
            })
            .catch(err=>{
              console.log(err)
              res.status(400).send(err)


            })
  })
      return db
}
exports.addPost=addPost;
exports.getPosts=getPosts;
exports.getUserPosts=getUserPosts;
exports.searchPosts=searchPosts;
exports.updateUsersPost=updateUsersPost;
exports.getPostFromNotif=getPostFromNotif;
exports.updatePost=updatePost;
exports.deletePost=deletePost;
