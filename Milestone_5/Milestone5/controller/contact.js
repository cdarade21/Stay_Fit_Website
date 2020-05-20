// Contact Page
const express = require("express");
const router = express.Router();

router.use(function(req, res, next) {
  
    if( req.session.user!=undefined){
    res.locals.user = req.session.user;
    res.locals.user_obj=req.session.user_obj;}
    next();
});

//get functiom
router.get("/", function(request, response) {
    response.render("contact");
});

//export the router
module.exports = router;
