// New Connections page

let user = require("./../models/user");
const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

// get function
router.get("/", function(request, response) {
    response.render("newConnection", {set:request.session.user});
});

// post function for new connection/ sign up forms
router.post("/", function(req, res) {
    var user_id = req.body.userId;
    var user_fname = req.body.fname;
    var user_lname = req.body.lname;
    var class_category = req.body.category;
    var class_topic = req.body.topic;
    var userDetails = new user(req.body.userId, req.body.fname, req.body.lname, req.body.category, req.body.topic, req.body.location);

    // print entered data on seperate broeser window
    res.send("USERID:" + req.body.userId + "<br/><br/>" +"CLIENT FIRST NAME:  " + req.body.fname + "<br/><br/>" + "CLIENT LAST NAME: " + req.body.lname + "<br/><br/>" +
            "CLASS CATEGOTY:  " + req.body.category + "<br/><br/>" + "CLASS TOPIC: " + req.body.topic + "<br/><br/>"  +
            "LOCATION: " + req.body.location + "<br/><br/>");
});

//export the router
module.exports = router;
