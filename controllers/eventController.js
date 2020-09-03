const Event = require('../models/Event');
const mongoDb = require('../index')
const ObjectId = require('mongodb').ObjectId;




const addEvent = (req,res,next)=>{

  const name=req.body.name;
  const background=req.body.background;
  const description=req.body.description;
  const place=req.body.place;
  const date=req.body.date;
  const time=req.body.time;
  const type=req.body.type;
  const icone=req.body.icone;
  const profilImage=req.body.profilImage;
  const userName=req.body.userName
  const team1=req.body.team1
  const team2=req.body.team2



const event =new Event(name,background,description,place,date,time,type,icone,profilImage,userName,team1,team2);


    event
      .save()
      .then(result=>{
        res.status(200).send()
        console.log("event saved")


      })
      .catch(err=>{
        res.status(400).send()

        console.log(err)
      })
}
const getEvents =(req,res,next)=>{

  mongoDb.mongoDb.then( (val)=>{
   return val
             .collection("events")
             .find()
             .toArray()
             .then( (result)=>{
                res.json(result)
                console.log("events returned")

             })
             .catch(err=>{
               console.log(err)
             })
 })

}
const insertEventParticipant =(userId,eventId,userName,image)=>{

  mongoDb.mongoDb.then( (val)=>{
   return val
             .collection("events")
             .update({_id:ObjectId(eventId)},
             {
               $push :
               {
               participants:
                   {
                     userName:userName,
                     userImage:image,
                     userId:userId
                 }
               }
             }
           )
             .then( (result)=>{
                console.log("participant saved")

             })
             .catch(err=>{
               console.log(err)
             })
 })

}
const insertEventTeamParticipant =(team,userId,eventId,userName,image)=>{
if (team===1) {
      mongoDb.mongoDb.then( (val)=>{
       return val
                 .collection("events")
                 .update({_id:ObjectId(eventId)},
                 {
                   $push :
                   {
                   "team1.participants":
                       {
                         userName:userName,
                         userImage:image,
                         userId:userId
                     }
                   }
                 }
               )
                 .then( (result)=>{
                    console.log("participant saved")

                 })
                 .catch(err=>{
                   console.log(err)
                 })
     })
} else if (team===2) {
  mongoDb.mongoDb.then( (val)=>{
   return val
             .collection("events")
             .update({_id:ObjectId(eventId)},
             {
               $push :
               {
               "team2.participants":
                   {
                     userName:userName,
                     userImage:image,
                     userId:userId
                 }
               }
             }
           )
             .then( (result)=>{
                console.log("participant saved")

             })
             .catch(err=>{
               console.log(err)
             })
 })
}


}
exports.addEvent=addEvent;
exports.getEvents=getEvents;
exports.insertEventParticipant=insertEventParticipant;
exports.insertEventTeamParticipant=insertEventTeamParticipant;
