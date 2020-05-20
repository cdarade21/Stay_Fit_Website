// About File

const express = require("express");
const router = express.Router();

// get function
router.get("/", function(request, response) {
    response.render("about",{set:request.session.user});
});

//export the router
module.exports = router;
