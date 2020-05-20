// New Connections page
const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

const ConnDB = require("../util/connDB");
const connDB = new ConnDB();

const UserDB = require("../util/UserDB");
const userDB = new UserDB();

const UserProfileDB = require("../util/UserProfileDB");
const userProfileDB = new UserProfileDB();

const { check, validationResult } = require("express-validator");

router.use(async function(request, response, next) { // Middleware
    if( request.session.user!=undefined)
    {
        response.locals.user = request.session.user;
        let up= await userProfileDB.getUserProfile(request.session.user.email); // search for profile    
        response.locals.profile_info =up[0].conns_rsvp;
    }
    next();
});

// get function
router.get("/", function(request, response) {
    response.render("newConnection");
});

// post function for new connection/ sign up forms
router.post("/", 
[ check("topic")
    .not().isEmpty()
    .withMessage("Topic Can not be empty")
    .isLength({ min: 3, max: 100 })
    .withMessage("must be 3 upto 100 characters")
    .matches(/^[0-9a-zA-Z ]+$/i)
    .withMessage("must only contain letters, numbers and spaces"),

    check("name")
    .not().isEmpty()
    .withMessage("Name Can not be empty")
    .isLength({ min: 3, max: 100 })
    .withMessage("must be 3 upto 100 characters")
    .matches(/^[0-9a-zA-Z ]+$/i)
    .withMessage("must only contain letters, numbers and spaces"),

    check("name").custom(async (name, { req }) => {
        console.log("Checking if this name already exist for this tpoic");
        let val = await connDB.verifyName(req.body.topic,name);
        
       if (val.length != 0) {
         return Promise.reject();
       }
       
     }).withMessage("Selected Name already exist. Try a diffrent one!"),

    check("details")
    .not().isEmpty()
    .withMessage("Details Can not be empty")
    .isLength({ min: 3, max: 300})
    .withMessage("must be 3 upto 300 characters"),

    check("host")
    .not().isEmpty()
    .withMessage("Host Can not be empty, Select from the list"),

    check("date")
    .not().isEmpty()
    .withMessage("Date Can not be empty"),

    check("date").custom((date, { req }) => {

        let simplestartDate = req.body.date.split("-")[0]+req.body.date.split("-")[1]+req.body.date.split("-")[2];
        let today = new Date().toISOString().slice(0,10);
        let todayDate = today.split("-")[0]+today.split("-")[1]+today.split("-")[2];

        if (simplestartDate < todayDate) {
          throw new Error("Can not register for previous dates. Please select date tomorrow onwards.");
        }
        return true;
    }),

    check("start_time")
        .not().isEmpty()
        .withMessage("Start Date Can not be empty")
        .isLength({ min: 5, max: 5})
        .withMessage("must be of 5 characters within correct format for e.g: 08:00"),

    check("end_time")
        .not().isEmpty()
        .withMessage("End Date Can not be empty")
        .isLength({ min: 5, max: 5})
        .withMessage("must be of 5 characters within correct format for e.g: 20:00"),

    check("start_time").custom((end_time, { req }) => {
        let simplestart = req.body.start_time.split(":")[0] + req.body.start_time.split(":")[1];
        let simpleend = req.body.end_time.split(":")[0] + req.body.end_time.split(":")[1];

        if (simplestart >= simpleend) {
          throw new Error("end time must be after start time");
        }

        if (parseInt(req.body.start_time.split(":")[0]) < 8) {  
           throw new Error("Book a slot after 8:00 AM to 8:00 PM");
        }
        return true;
    }),

    check("end_time").custom((start_time, { req }) => {
        if (parseInt(req.body.end_time.split(":")[0]) > 20) {
            throw new Error("Book a slot from 8:00 AM to 8:00 PM");
        }
        return true;
    }),
  ],

async function(request, response) {

    //express-validator validationResult
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      response.render("newConnection", { errorlist: errors.array()});
      return;
    }

    

    let events =await connDB.getConnections(); // get the count of connections to define cid of new connection
	let length= events.length;
	let conn = await connDB.addNewConnection(request.session.user,length+1,request.body) // add the connection in conn DB
	
	let add_conn = await userProfileDB.addConnection(request.session.user.email,(length+1).toString(),request.body.topic,request.body.name,"Yes");  // add the conn in saved events for the logged in user
	let up= await userProfileDB.getUserProfile(request.session.user.email); // search for profile

	response.locals.profile_info =up[0].conns_rsvp;
	request.session.token=Math.random();
	response.locals.token=request.session.token;
	
    response.render("client");
});

//export the router
module.exports = router;
