// Connection Details Page

const express = require('express');
const router = express.Router();
let Connection=require("./../models/connection")
let ConnDB=require("./../util/connDB.js")

// Middleware
router.use(function(req, res, next) {
  if( req.session.user!=undefined){
    res.locals.user = req.session.user;
  }
    next();
});

// get function
router.get('/', function (req, res) {

  if (Object.keys(req.query).length == 0) {
    let connDB = new ConnDB();
    var connDBlist = connDB.getConnections();
    var topic = connDB.getTopic();
    res.render("Classes", {connDBlist: connDBlist, topic: topic, set:req.session.user});
    var connDBlist = connDB.getConnections();
  }
  else {
    var connectionId = req.query.connId;
    let connDB = new ConnDB();
    var object = connDB.getConnectionbyId(connectionId);
    res.render('Classes_Detail',{connObject: object,set:req.session.user});
  }
});

// get function
router.get('/*', function(request, response) {
  response.render("index",{set:0})
});

module.exports = router;
