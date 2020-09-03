const  mongodb = require('mongodb')
const MongoClient = require('mongodb').MongoClient
const uri ="mongodb+srv://Mourad:leanacalderon@cluster0-x5ksp.mongodb.net/test?retryWrites=true&w=majority";

class MongoDb {
  constructor(){
    this.db;
  }
mongoPoolPromise(){

  const connPoolPromise = new Promise((resolve, reject) => {
    const conn = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (conn.isConnected()) {
      return resolve(conn);
    } else {
      conn
        .connect()
        .then(() => {
          console.log(this.db)
          console.log("connected")

          return resolve(conn.db('test'));

        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    }
  });

  return connPoolPromise;
};
 getDb(){
  if(this.db){
    return this.db
  }
  throw "db not found"
}

//const getDb = ()=>{
  //console.log(datab)
  //if (datab) {
    //return datab
  //}
  //else {
    //throw "no db found!";

  //}
//};
}
module.exports=MongoDb;
