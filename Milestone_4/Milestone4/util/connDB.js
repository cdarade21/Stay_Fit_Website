let Connection = require("../models/connection");

var mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var connSchema = new mongoose.Schema({
	
	  cid : { type: String, default: "0000" },
    name : { type: String, default: "connection name" },
    topic : { type: String, default: "connection topic" },
    details : { type: String, default: "Details" },
	  host:{type:String,default: "host"},
	  date : { type: String, default: "Date" },
	  time : { type: String, default: "Time" },
	  venue : { type: String, default: "Venue" },
	  creator:{type:String, default: "None"}
});
	
connectionDB = mongoose.model("Connection", connSchema,"Connections");

class connDB {

  // adding a new Connection for start a new connection form submission
    addNewConnection(email,cid,new_conn) {
      return new Promise((resolve, reject) => {
        console.log(typeof(cid.toString()));
	      console.log(new_conn);
	      let theConn = new connectionDB({
          cid: cid.toString(),
          name: new_conn.name,
          topic: new_conn.topic,
          details: new_conn.details,
		      host:new_conn.host,
		      date: new_conn.date,
          time: new_conn.time,
          venue: new_conn.venue,
		      creator:email
        });

        theConn.save()
	      .then((data)=>{
		      console.log(data);
		      resolve(data);
	      })
	      .catch((err) => {
		      console.log("IN catch")
          return reject(err);
        }); 
    });
  } //end addConnection
  
  deleteConnection(email,cid){
	  return new Promise((resolve, reject) => {
		/*	connectionDB.findOne(
			{ creator: email , cid: cid})
		.then((data1)=>{
	  
	  if (data1!=null){ */
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
			    console.log("Data" + data);
			    for (let i=0;i<data.length;i++) {
			      if (topic.indexOf(data[i].topic)=== -1) {
			        topic.push(data[i].topic);
			        //console.log();
            }
          }
			    resolve(topic);
		    })
        .catch((err) => {
          return reject(err);
        });
    });
  } //end getCourse
}

module.exports = connDB;