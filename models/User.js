const database=require('../Util/database')
const mongoDb = require('../index')
class User {
  constructor(name,email,phone,filiere,niveau,gender,date,image,pass1){
          this.name = name;
          this.email=email;
          this.phone=phone;
          this.niveau=niveau;
          this.filiere=filiere;
          this.gender=gender;
          this.date=date;
          this.image=image;
          this.pass1=pass1;
          this.likedPosts=[]
          this.status=0
  }


  save(){

  const db = mongoDb.mongoDb.then((val)=>{
    return   val
            .collection('users')
            .insertOne(this)
            .then(result=>{
              console.log("user saved")
            })
            .catch(err=>{
              console.log(err)
            })
  })
      return db

}
}
module.exports=User;
