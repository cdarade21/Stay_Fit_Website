const express = require("express");
const router = express.Router();

const UserProfileDB = require("../util/UserProfileDB");
const userProfileDB = new UserProfileDB();

const ConnDB = require("../util/connDB");
const connDB = new ConnDB();

router.use(function(request, response, next) { // Middleware
	response.locals.user = request.session.user;
  next();
});

router.post("/", async function(request, response) {
	if (request.session.token == request.body.token)
	{   // check for authenticity and then delete
		console.log("In Delete Call")
		await userProfileDB.deleteUserConnection(request.session.user.email,request.body.cid)
		response.locals.token=request.session.token;
		let up= await userProfileDB.getUserProfile(request.session.user.email); // search for profile
		
		response.locals.profile_info =up[0].conns_rsvp;
		
		connDB.deleteConnection(request.session.user.email,request.body.cid);
		
		response.render("client"); 
	}
	else{
		console.log("In Delete")
		console.log(request.session.token,request.body.token)
		response.render("login");
	}	
});	
	
//export the router
module.exports = router;