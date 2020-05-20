let Connection = require("../models/connection");

var mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var connSchema = new mongoose.Schema({
	
	  cid : { type: String, default: "0000" },
    name : { type: String, default: "connection name" },
    topic : { type: String, default: "connection topic" },
    details : { type: String, default: "Details" },
	  host:{type:String,default: "Chaitanya Darade"},
	  date : { type: String, default: "Date" },
    start_time : { type: String, default: "Time" },
    end_time : { type: String, default: "Time" },
	  where : { type: String, default: "Charlotte Midtown" },
	  creator: {type: String, default: "None"}
});
	
connectionDB = mongoose.model("Connection", connSchema,"Connections");

class connDB {

  // adding a new Connection for start a new connection form submission
    addNewConnection(user,cid,new_conn) {
      return new Promise((resolve, reject) => {
	      let theConn = new connectionDB({
          cid: cid.toString(),
          name: new_conn.name,
          topic: new_conn.topic,
          details: new_conn.details,
		      host:new_conn.host,
		      date: new_conn.date,
          start_time: new_conn.start_time,
          end_time: new_conn.end_time,
          where: new_conn.where,
		      creator:user.email
        });

        theConn.save()
	      .then((data)=>{
		      resolve(data);
	      })
	      .catch((err) => {
          return reject(err);
        }); 
    });
  } //end addConnection
  
  deleteConnection(email,cid){
	  return new Promise((resolve, reject) => {
	    console.log("Deleting from Connections")
		  connectionDB.deleteOne({creator: email , cid: cid})
			.then((data) => {
        resolve(data);
		  })
      .catch((err) => {
        return reject(err);
      });
	  // }
	  });
  }
  
  getConnections() {                                    // To display connections on Connections Page
    console.log("in getConnections()");
    return new Promise((resolve, reject) => {
      connectionDB
        .find({})
        .then((data) => {
          console.log("fetched all Connections from db");
          resolve(data);
		    })
        .catch((err) => {
          return reject(err);
        });
    });
  }
  
  getConnection(cid) {									// To display a connection on Connection Page
    return new Promise((resolve, reject) => {
      connectionDB
        .find({cid: cid }           
        )
        .then((data) => {
          resolve(data);
		    })
        .catch((err) => {
          return reject(err);
        });
    });
  } //end getCourse
  
  
  getTopic() {		
	  console.log("In get Topics");				// To get topics on Connection Page
    return new Promise((resolve, reject) => {
      connectionDB
        .find({})
        .then((data) => {
		      var topic=[];
			    for (let i=0;i<data.length;i++) {
			      if (topic.indexOf(data[i].topic)=== -1) {
			        topic.push(data[i].topic);
            }
          }
			    resolve(topic);
		    })
        .catch((err) => {
          return reject(err);
        });
    });
  } //end getCourse

  verifyName(topic,name){
  console.log("In Verify Name");				// To get topics on Connection Page
  console.log(topic,name);	
   return new Promise((resolve, reject) => {
     connectionDB
       .find({topic:topic, name:name})
       .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        return reject(err);
      });
   });
  }
}

module.exports = connDB;