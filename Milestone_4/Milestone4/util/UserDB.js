var mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var userSchema = new mongoose.Schema({
	fname : { type: String, default: "first name" },
    lname : { type: String, default: "last name" },
    email : { type: String, default: "email id" },
    psw : { type: String, default: "Password" },
	addr : { type: String, default: "Address" },
	city : { type: String, default: "City" },
	state : { type: String, default: "State" },
	country : { type: String, default:"Country"},
	zipcode : { type: String, default:"zipcode"}
});
	
userDB = mongoose.model("Users", userSchema,"Users");

class UserDB {
	verifyUser(email) {
    return new Promise((resolve, reject) => {
    	if(email!=""){
			userDB.findOne(
				{email: email })
				.then((data) => {
					console.log("In db");
					resolve(data);
				})
				.catch((err) => {
					return reject(err);
				});		
	 	}
	 	else {
			userDB.findOne({})
				.then((data)=>{
					console.log(data);
					resolve(data);
				})
				.catch((err) => {
					return reject(err);
				});
	 	}		
    });
  } //end Verify User
}

module.exports = UserDB;