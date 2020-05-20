// Client(Saved Connections page) 

const express = require("express");
const router = express.Router();

let des=["Yes","No","May be"];

const UserDB = require("../util/UserDB");
const userDB = new UserDB();

const UserProfileDB = require("../util/UserProfileDB");
const userProfileDB = new UserProfileDB();

let ConnDB = require("./../util/connDB");
const connDB = new ConnDB();

router.post("/", async function(request, response)  {
  if (request.session.token===undefined){   // for login post only
    var email=request.body.uname;
    console.log("Login Verification");
    let user = await userDB.verifyUser(email); // get the desired user or the first user if the one we want is not there
    request.session.user=user;       // Add user to session
    console.log("Session started for user:");
    console.log(request.session.user);
    let up= await userProfileDB.getUserProfile(user.email); // search for profile
    console.log(up);

    if (up.length==0){            //if no profile then add the profile and return
		  console.log("Setting the profile");
		
		  let profile=await userProfileDB.addProfile(user.email);
		
		  console.log(profile);
		  response.locals.profile_info =profile.conns_rsvp; 
    }
    else{
		  response.locals.profile_info =up[0].conns_rsvp;  //if profile data exist
      console.log(up[0].conns_rsvp)
    }

		response.locals.user = request.session.user; // Attach in response variable the session objects
    response.locals.connDB=connDB; // To extract connection info on ejs page
    request.session.token =Math.random();  //Random value
		response.locals.token=request.session.token;   //token saved
    response.render("client")
  }
  else
  {											//post from yes, no, maybe	 
      if (request.session.user===undefined) {
         response.render("login");
      }
      console.log("To add Connection");
      if (request.session.token==request.body.token){  //check token to get hidden parameters
        //To add the connection
        console.log("To add Connection");

        if (des.indexOf(request.body.des) > -1 && await connDB.getConnection(request.body.cid).length!=0){
          console.log("Add to users connections");
          var conn=await connDB.getConnection(request.body.cid);
					//console.log(conn);
					let added_conn=await userProfileDB.addConnection(request.session.user.email,request.body.cid,conn[0].topic,conn[0].name,request.body.des);
					console.log(added_conn);	
        }
        request.session.token =Math.random();  //Random value
				response.locals.token=request.session.token;   //token saved
				response.locals.user = request.session.user; // Attach in response variable the session objects
			
				let up= await userProfileDB.getUserProfile(request.session.user.email); // search for profile
				response.locals.profile_info =up[0].conns_rsvp;
        response.render("client");
      }
      else{
        response.render("login");  // if forged then ask to first log in
      }
  }
});

// get request  
router.get("/",async function(request, response) {
  response.locals.user = request.session.user;
	let up= await userProfileDB.getUserProfile(request.session.user.email); // search for profile
  response.locals.profile_info =up[0].conns_rsvp;
  request.session.token=Math.random();
	response.locals.token=request.session.token;
	response.render("client");
});

router.all("/*", function(request, response) {
  response.render("client");
});
 
//export the router
module.exports = router;