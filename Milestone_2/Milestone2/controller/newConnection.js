const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", function(request, response) {
  //create data
    console.log("Hi I am in Get")
    response.render("newConnection");
});

router.post("/", function(req, res) {
    var user_fname = req.body.fname;
    var user_lname = req.body.lname;
    var class_category = req.body.category;
    var class_topic = req.body.topic;
    var date= req.body.date;

    res.send("CLIENT FIRST NAME:  " + req.body.fname + "<br/><br/>" + "CLIENT LAST NAME: " + req.body.lname + "<br/><br/>" +
            "CLASS CATEGOTY:  " + req.body.category + "<br/><br/>" + "CLASS TOPIC: " + req.body.topic + "<br/><br/>"  +
            "DATE:  " + req.body.date);
});

//export the router
module.exports = router;
