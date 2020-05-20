// Client(Saved Connecctions page) 

const express = require("express");
const router = express.Router();

let userProfile = require("./../util/userProfile");
let ConnectionDB = require("./../util/connDB");

// post request from Login page
router.post("/", function(request, response)  {
	let user = new userProfile(1); // Add user object
  request.session.user=user;
  request.session.connId = 0
	console.log("Session started");
  response.locals.user = request.session.user;
  response.render("client",{user_client:request.session.user,set:request.session.user});
});

//Middleware
router.use(function(request, response, next) {
  response.locals.user = request.session.user;
  next();
});

// get request  
router.get("/", function(request, response) {
  let user = new userProfile(1);
  let connDB= new ConnectionDB();

  if (request.session.user!== undefined && Object.keys(request.query).length!=0){
    if(request.query.rsvp!=undefined){
      if(request.session.user===undefined){
        response.render("client",{user_client:request.session.user,connDB:connDB,set:request.session.user})
      }
      var p = user.addConnection(request.session.user, request.query.connId, request.query.rsvp); // Addconnection Logic
    }
    else {
      user.deleteConnection(request.session.user,request.query.connId); // Deleteconnection Logic
    }
    response.render("client",{user_client:request.session.user,connDB:connDB,set:request.session.user});
  }
  else if(request.session.user){
    response.render("client",{user_client:request.session.user,connDB:connDB,set:request.session.user}); // User Login for the first time showa blank connections page
  }
  else {
    response.redirect("login") // If user not logged in, take him to the Login page 
  }
});

//export the router
module.exports = router;
