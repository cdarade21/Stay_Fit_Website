// About File
const express = require("express");
const router = express.Router();

router.use(function(request, response, next) {
  
    if( request.session.user!=undefined){
        response.locals.user = request.session.user;
        response.locals.user_obj=request.session.user_obj;
    }
    next();
});

// get function
router.get("/", function(request, response) {
    response.render("about");
});

//export the router
module.exports = router;
