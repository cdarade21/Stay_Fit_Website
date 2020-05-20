// Log in Page
const express = require("express");
const router = express.Router();

// get function
router.get("/", function(request, response) {
  // Initially redirect page to client(My connections page)
  if(request.session.user != undefined){
		response.render("client");
	}	
	else{
    response.render("login");
  }
});

//export the router
module.exports = router;
