var express = require('express');
var router = express.Router();
let Connection=require("./../models/connection")
let ConnDB=require("./../util/connDB.js")


router.get('/', function (req, res) {
  console.log("Query String Is");
  console.log(req.query);

  if (Object.keys(req.query).length == 0) {
    let connDB = new ConnDB();

    var connDBlist = connDB.getConnections();
    var topic = connDB.getTopic();

    res.render("Classes", {connDBlist: connDBlist, topic: topic});
    var connDBlist = connDB.getConnections();
    console.log(req.query.connId);
    console.log(connDBlist);
    console.log(topic);
  }
  else {
    var connectionId = req.query.connId;
    let connDB = new ConnDB();
    console.log(connectionId);
    var object = connDB.getConnectionbyId(connectionId);
    console.log(object);
    res.render('Classes_Detail',{connObject: object});
    console.log(object);
  }
});

router.get('/*', function(request, response) {
  response.render("index")
});

module.exports = router;
