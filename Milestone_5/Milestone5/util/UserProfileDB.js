var mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var upSchema = new mongoose.Schema({
	email: { type: String, default: "email" },
	conns_rsvp : [{cid:String,connection_topic:String,connection_name:String,rsvp:String}]
});
	
userProfileDB = mongoose.model("UserProfile", upSchema,"UserProfile");

class UserProfileDB {	
	getUserProfile(email) {									// To display a connection on Connection Page
		return new Promise((resolve, reject) => {
		userProfileDB
			.find({email: email }           
			)
			.then((data) => {
				resolve(data);
			})
			.catch((err) => {
			return reject(err);
			});
		});
  	} //end getCourse
	
	addProfile(email) {									// Add profile
    return new Promise((resolve, reject) => {

		var prof = {
			 email: email,
			  conn_rsvp: [{"cid":"","connection_topic":"", "connection_name":"", "rsvp":""}]
			};

		var profile = new userProfileDB(prof);
    
      	profile
        	.save()          
        	.then((data) => {
		  		resolve(data);
       		})
        .catch((err) => {
          return reject(err);
        });
    });
  } //end getCourse
	
//add connection and rsvp

	addConnection(email,cid,topic,name,rsvp) {									// Add profile
    	return new Promise((resolve, reject) => {
			userProfileDB.findOne(
				{ email: email , "conns_rsvp.cid": cid})
				.then((data)=>{
					if (data==null){
						var conn_rsvp= {"cid":cid,"connection_topic":topic,"connection_name":name, "rsvp":rsvp};
						console.log("Add a new connection as it dosenot exist");
						userProfileDB.updateOne(
						{ email: email }, 
						{ $push: { conns_rsvp: conn_rsvp } }
						)
	   					.then((data) => {
        					resolve(data);
        				})
        				.catch((err) => {
          					return reject(err);
        				});
					}		//end of add new connection
					else{                                // update rsvp for an existing connection
						console.log("Update existing")
						userProfileDB.updateOne(
							{ email: email, "conns_rsvp.cid":cid }, 
							{ "$set": { "conns_rsvp.$.rsvp": rsvp } }
						)
						.then((data) => {
		  					resolve(data);
        				})
        				.catch((err) => {
          					return reject(err);
        				});
				
					}
			
				})
		 		.catch((err) => {
          			return reject(err);
        		});
    	});
  	}//end getCourse

//delete a connection

	deleteUserConnection(email,cid) {									// To display a connection on Connection Page
    	return new Promise((resolve, reject) => {
			console.log("In Delete Function")
	 		userProfileDB.findOne(
				{ email: email , "conns_rsvp.cid": cid})
				.then((data1)=>{
					if (data1!=null){
						console.log("Deleting")
	  					userProfileDB.updateOne({email: email },{"$pull":{"conns_rsvp": {"cid":cid}}} )           
        				.then((data) => {
          					console.log("Deleted");
		  					console.log(data);
		  					resolve(data);
        				})
        				.catch((err) => {
          					return reject(err);
	  					});
	  				}
	  				else{
						  resolve(data1);
					}
    			})
				.catch((err) => {
          			return reject(err);
        		});
		
		});
	}
}

module.exports = UserProfileDB;