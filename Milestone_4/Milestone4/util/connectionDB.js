// connDB page

let Connection = require("../models/connection");

const connections = [
  new Connection("1PT","CONSULTATION AND ASSESSMENT","PERSONAL TRAINING","Self-Diagnoses with Comfort and Convenience","Hosted By: Chaitanya Darade","MAR 10th 20","10:00 AM"),
  new Connection("1GT","RISE AND SHINE","GROUP TRAINING","The art of medicine consists of amusing the patient while nature cures the disease.","MAR 10th 20","Hosted By: Chaitanya Darade","10:00 AM"),
  new Connection("2PT","CUSTOMIZED WORKOUT PROGRAM","PERSONAL TRAINING","Challenge clients to be better.","Hosted By: Chaitanya Darade","MAR 20th 20","12:00 PM"),
  new Connection("2GT","YOGA","GROUP TRAINING","Yoga is a combination of strength, balance, and flexibility","Hosted By: Chaitanya Darade","MAR 20th 20","12:00 PM"),
  new Connection("3PT","PERSONAL TRAINING SESSIONS","PERSONAL TRAINING","Take care of your body. It’s the only place you have to live.","Hosted By: Chaitanya Darade","MAR 30th 20","2:00 PM"),
  new Connection("3GT","GROUP EXERCISE","GROUP TRAINING","GROUP EXERCISE","Hosted By: Chaitanya Darade","MAR 30th 20","2:00 PM"),
  new Connection("4PT","PERSONAL DIET SESSION","PERSONAL TRAINING","Food is an important part of a balanced diet.","Hosted By: Chaitanya Darade","APR 10th 20","10:00 AM"),
  new Connection("1FT","LAGUGHTER EXERCISE","FUN TRAINING","Laughter may even help you to live longer","Hosted By: Chaitanya Darade","APR 10th 20","10:00 AM")
];

class ConnectionDB {

    // return all connections
    getConnections(){
      return connections;
    }

    // return unique connections topic list
    getTopic(){
      var topic=[];
      var i = 0
      for (var key in connections) {
        var obj = connections[key]
        for (let [key, value] of Object.entries(obj)) {
          if(key == 'connTopic' && value.length>0){
            if(topic.includes(value)==0){
              topic[i] = value
              i = i+1
            }
          }
        }
      }
      return topic
    }

    // return connection for the ID sent as a parameter
    getConnectionbyId(connId){
      for( var i in connections){
        var obj = connections[i]
        for (let [key, value] of Object.entries(obj)) {
          if (key == 'connId' && value.length>0 && value==connId) {
            return connections[i];
          }
        }
      }
      return "Not_Found"
    }
}

// export ConnDB
module.exports = ConnectionDB;
