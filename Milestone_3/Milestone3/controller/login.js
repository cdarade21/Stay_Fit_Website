// Log in Page
const express = require("express");
const router = express.Router();

// get function
router.get("/", function(request, response) {
  // Initially redirect page to client(My connections page)
  if(request.session.user != undefined){
		response.redirect("client");
	}	
	else{
    response.render("login",{set:request.session.user});
  }
});

//export the router
module.exports = router;
