// New Connections page
const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

const ConnDB = require("../util/connDB");
const connDB = new ConnDB();

const UserDB = require("../util/UserDB");
const userDB = new UserDB();

const UserProfileDB = require("../util/UserProfileDB");
const userProfileDB = new UserProfileDB();

router.use(async function(request, response, next) { // Middleware
    if( request.session.user!=undefined)
    {
        response.locals.user = request.session.user;
        let up= await userProfileDB.getUserProfile(request.session.user.email); // search for profile    
        response.locals.profile_info =up[0].conns_rsvp;
    }
    next();
});

// get function
router.get("/", function(request, response) {
    response.render("newConnection");
});

// post function for new connection/ sign up forms
router.post("/", async function(request, response) {

    let events =await connDB.getConnections(); // get the count of connections to define cid of new connection
	let length= events.length;
    console.log(request.body)
    console.log("In New Connection" + request.session.user)
	let conn = await connDB.addNewConnection(request.session.user.email,length+1,request.body) // add the connection in conn DB
	
	let add_conn = await userProfileDB.addConnection(request.session.user.email,(length+1).toString(),request.body.topic,request.body.name,"Yes");  // add the conn in saved events for the logged in user
	let up= await userProfileDB.getUserProfile(request.session.user.email); // search for profile

	response.locals.profile_info =up[0].conns_rsvp;
	request.session.token=Math.random();
	response.locals.token=request.session.token;
	
    response.render("client");
});

//export the router
module.exports = router;
