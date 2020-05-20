// Contact Page
const express = require("express");
const router = express.Router();

//get functiom
router.get("/", function(request, response) {
    response.render("contact",{set:request.session.user});
});

//export the router
module.exports = router;
