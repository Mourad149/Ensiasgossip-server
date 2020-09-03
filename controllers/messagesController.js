const Messages = require('../models/Messages');
const mongoDb = require('../index')


const addMessage = (name,mess,room,image,userId,msgImage)=>{




const message=new Messages(name,mess,room,image,userId,msgImage);


    message
      .save()
      .then(result=>{
        console.log("message saved")


      })
      .catch(err=>{
        console.log(err)
      })
}
const updateUsersMessages = (req,res,next)=>{

  const profilImage=req.body.image;
  const name=req.body.name;


  const id = req.params.id
  const db = mongoDb.mongoDb.then((val)=>{
    return   val
            .collection('messages')
            .updateMany({userId:id},
            {$set:
               {
                 name:name,
                 profilImage:profilImage
               }
             }
          )
            .then(result=>{
                console.log("messages updated")
                res.status(200).send()
              })
            .catch(err=>{
              res.status(400).send(err)
              console.log(err)

            })
  })
  next()
      return db
}
const  getMessages= (req,res,next)=>{
  const room=req.params.room
  const db =  mongoDb.mongoDb.then((val)=>{
     return val
               .collection("messages")
               .find()
               .sort({_id:-1})
               .skip(parseInt(req.params.skip))
               .limit(5)
               .toArray()
               .then( (result)=>{
                 console.log("retrieved")
                 let messages=[];
                 for(let i=0;i<result.length;i++){
                  messages.push({user:result[i].name,text:result[i].text,room:result[i].room,image:result[i].profilImage,userId:result[i].userId,msgImage:result[i].msgImage})

                 }


                  return res.send(messages);
               })
               .catch(err=>{
                 console.log(err)

               })

   })

  return db
}
exports.addMessage=addMessage
exports.getMessages=getMessages
exports.updateUsersMessages=updateUsersMessages;
