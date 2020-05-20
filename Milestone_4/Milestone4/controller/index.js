// Index Page
const express = require("express");
const router = express.Router();

router.use(function(req, res, next) {
  
  if( req.session.user!=undefined){
  res.locals.user = req.session.user;
  res.locals.user_obj=req.session.user_obj;}
  
  next();
});

router.get("/", function(request, response) {
 if(request.query.value==="destroy"){
    request.session.destroy();
    response.locals.user =undefined
}
  response.render("index");
});

//export the router
module.exports = router;