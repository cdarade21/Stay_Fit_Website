// Index Page
const express = require("express");
const router = express.Router();

// get function
router.get("/", function(request, response) {
  //On clicking Sign-Out Button, Destroy the current session and redirect to home(index) page
  if (Object.keys(request.query).length!=0){
    request.session.destroy(function(err){
        if(err){
          response.negotiate(err)
        }
        console.log("Session Destroyed")
        response.redirect("/")
    });
  }
  else{
    response.render("index",{set:request.session.user});
  } 
});

//export the router
module.exports = router;
