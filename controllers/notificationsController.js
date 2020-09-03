const mongoDb = require('../index')


const getNotifications =(req,res,next)=>{


  mongoDb.mongoDb.then( (val)=>{
   return val
             .collection("notifications")
             .find({room:req.params.room,userId: { $ne: req.params.id}})
             .sort({_id:-1})
             .skip(parseInt(req.params.skip))
             .limit(5)
             .toArray()
             .then( (result)=>{
                res.json(result)
                console.log(" notif returned")

             })
             .catch(err=>{
               console.log(err)
             })
 })

}
const updateUsersNotifications = (req,res,next)=>{

  const profilImage=req.body.image;
  const name=req.body.name;


  const id = req.params.id
  const db = mongoDb.mongoDb.then((val)=>{
    return   val
            .collection('notifications')
            .updateMany({userId:id},
            {$set:
               {
                 name:name,
                 profilImage:profilImage


               }
             }
          )
            .then(result=>{
              console.log(" user's notifications updated succesfuly")
            })
            .catch(err=>{
              console.log(err)

            })
  })
  next()
      return db
}
exports.getNotifications=getNotifications;
exports.updateUsersNotifications=updateUsersNotifications;
