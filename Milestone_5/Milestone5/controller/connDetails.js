// Connection Details Page

const express = require('express');
const router = express.Router();

let ConnDB=require("./../util/connDB.js")

const connDB = new ConnDB();

const { check, validationResult } = require("express-validator");

// Middleware
router.use(async function(req, res, next) {
  res.locals.user = req.session.user;
  let events = await connDB.getConnections();
  let topics= await connDB.getTopic();
  res.locals.connDBlist=events;
  res.locals.topic=topics;
  next();
});

// get function
router.get('/',

[check("cid")
	  .exists().withMessage("Please select a connection from the given connections list").bail()
	  .not().isEmpty().withMessage("Please select a connection from the given connections list").bail()
	  .trim()
      .escape()
      .isAlphanumeric().withMessage('Invalid Connection id. Please select one from the given connections list').bail()
	  .custom(async cid => {
    let object = await connDB.getConnection(cid)
	if (object.length == 0) {
      return Promise.reject();
    }
  }).withMessage('Incorrect Connection id. Please select one from the given connections list') // when cid is not in Connections DB
],

async function (request, response) {
  
  const errors = await validationResult(request);
  if (!errors.isEmpty()) {
    response.render("Classes", { errorlist: errors.array() });
    return;
  }

  if (Object.keys(request.query).length == 0) {  // for connDetails page when no cid is passed
    let connDBlist = await connDB.getConnections();
	  let topic= await connDB.getTopic();
	  response.render("Classes", { connDBlist: connDBlist, topic:topic});
    //var connDBlist = connDB.getConnections();
  }
  else {
    if (request.session.user!=undefined){			// if user is logged in then only set random value token			
      request.session.token=Math.random();
      response.locals.token=request.session.token;
    }  
    else
    {
      response.locals.token=undefined;
    }

    var connectionId = request.query.cid;

    if (typeof connectionId === 'undefined'){
      let connDBlist = await connDB.getConnections();
      let topic= await connDB.getTopic();
      response.redirect("Classes",{ connDBlist: connDBlist, topic:topic });		// wrong cid so display connection page
    }
    else{
      var object = await connDB.getConnection(connectionId); // not proper cid
      if (typeof object === 'undefined'){
        let connDBlist = await connDB.getConnections();
        let topic= await connDB.getTopic();
        response.redirect("Classes",{ connDBlist: connDBlist, topic:topic });	
      }
      else
      {
        console.log("To display a connection");
        response.render('Classes_Detail',{connObject: object[0]}); // display connection page
      }
    }
    }
});

// get function
router.all("/*", function(request, response) {
  response.render("Classes");
 });

 //export the router
 module.exports = router;
