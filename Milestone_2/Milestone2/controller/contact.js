const express = require("express");
const router = express.Router();

router.get("/", function(request, response) {
  //create data
    response.render("contact");
});

//export the router
module.exports = router;
