
const User = require('../models/User');
const mongoDb = require('../index');
const messagesController =require('./messagesController')
const postController =require('./postController')
const ObjectId = require('mongodb').ObjectId;
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config();


const bcrypt = require('bcryptjs');

const addUsers =async  (req,res,next)=>{
  const name=req.body.name
  const email=req.body.email
  const phone=req.body.phone
  const gender=req.body.gender
  const date=req.body.date
  const image= req.body.image
  const pass1=req.body.pass1
  const niveau=req.body.niveau
  const filiere=req.body.filiere

const user=new User(name,email,phone,filiere,niveau,gender,date,image,pass1);
const salt =  bcrypt.genSaltSync(10);
 user.pass1 = bcrypt.hashSync(pass1, salt);
  console.log(user)
    user
      .save()
      .then(result=>{
        res.status(200).send()
        console.log("created user")



      })
      .catch(err=>{
        res.status(400).send()

        console.log(err)
      })
}
const updateProfil =async  (req,res,next)=>{
  const name=req.body.name
  const phone=req.body.phone
  const gender=req.body.gender
  const date=req.body.date
  const image= req.body.image
  let pass1=req.body.pass1


const salt =  bcrypt.genSaltSync(10);
    pass1 = bcrypt.hashSync(pass1, salt);
    const id = ObjectId(req.params.id)

    const db = mongoDb.mongoDb.then((val)=>{
      return   val
              .collection('users')
              .update({_id:id},
              {$set:
                 {
                   name:name,
                   phone:phone,
                   gender:gender,
                   date:date,
                   image:image,
                   pass1:pass1


                 }
               }
            )
              .then(result=>{
                console.log(" user profil updated succesfuly")
              })
              .catch(err=>{
                console.log(err)

              })
    })
      next()
        return db
}


const loginUsers= (req,res,next)=>{

    const email=req.body.email
    const password=req.body.pass1
    const room=req.body.room
     mongoDb.mongoDb.then( (val)=>{
      return val
                .collection("users")
                .findOne({email:email})
                .then( (result)=>{
                  const isMatch =bcrypt.compareSync(password,result.pass1);

                  if (isMatch) {
                  //  var thumb = new Buffer(result.image.data).toString('base64');
                    const payload={}
                  const secret=process.env.JWT_SECRET_KEY
                  console.log(secret)
                  const token = jwt.sign(payload, secret,{expiresIn: '365d'});
                  console.log(token)
                    console.log("login success")
                   var redir = {
                     name:result.name,
                     email:result.email,
                     niveau:result.niveau,
                     filiere:result.filiere,
                     image:result.image,
                     phone:result.phone,
                     gender:result.gender,
                     date:result.date,
                     userId:result._id,
                     likedPosts:result.likedPosts,
                     redirect: "/NewsFeed",
                     status:result.status,
                     token:token

                    }
                    console.log(redir)
                    // Issue token




                      return res.status(200).json(redir)

                  }else {
                    res.status(400).send()
                    console.log("login failed")
                  }
                })
                .catch(err=>{
                  console.log(err)
                    res.status(400).send(err)
                })
    })

}
const getUsers= (req,res,next)=>{


    console.log("getUsers executed")
     mongoDb.mongoDb.then( (val)=>{
      return val
                .collection("users")
                .find({niveau:req.params.niveau,filiere:req.params.filiere})
                .toArray()
                .then( (result)=>{
                    console.log("users retrived")
                    return res.json(result);
                        })
                .catch(err=>{
                  console.log(err)

                })
    })

}
const getEmailUsers= (req,res,next)=>{


    console.log("getEmailUsers executed")
     mongoDb.mongoDb.then( (val)=>{
      return val
                .collection("users")
                .find()
                .project({ email:1})
                .toArray()
                .then( (result)=>{
                    console.log(result)
                    return res.json(result);
                        })
                .catch(err=>{
                  console.log(err)

                })
    })

}
const getUser= (req,res,next)=>{


    console.log("getUsers executed")
     mongoDb.mongoDb.then( (val)=>{
      return val
                .collection("users")
                .findOne({_id:ObjectId(req.params.id)})
                .then( (result)=>{
                  console.log(result)



                    console.log("user retrived")

                    return res.json(result);


                })
                .catch(err=>{
                  console.log(err)

                })
    })

}
const banneUser= (id,status)=>{


    console.log("BanneUsers executed")
     mongoDb.mongoDb.then( (val)=>{
      return val
                .collection("users")
                .updateOne({_id:ObjectId(id)},
                {$set:
                   {
                      status:status
                   }
                 }
              )
                .then( (result)=>{
                    console.log("user status updated")


                })
                .catch(err=>{
                  console.log(err)

                })
    })

}


exports.addUsers=addUsers;
exports.loginUsers=loginUsers;
exports.getUsers=getUsers;
exports.getEmailUsers=getEmailUsers;
exports.getUser=getUser;
exports.updateProfil=updateProfil;
exports.banneUser=banneUser;
