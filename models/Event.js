const database=require('../Util/database')
const mongoDb = require('../index')

class Event {
  constructor(name,background,description,place,date,time,type,icone,profilImage,userName,team1,team2){
    this.name=name;
    this.background=background;
    this.description=description;
    this.place=place;
    this.date=date;
    this.time=time;
    this.type=type;
    this.icone=icone;
    this.profilImage=profilImage;
    this.userName=userName
    this.team1=team1
    this.team2=team2
    this.participants=[]

  }
  save(){
    console.log(this)
  const db = mongoDb.mongoDb.then((val)=>{
    return   val
            .collection('events')
            .insertOne(this)
            .then(result=>{
              console.log("event inserted")
            })
            .catch(err=>{
              console.log(err)

            })
  })
      return db

}
}
module.exports=Event;
