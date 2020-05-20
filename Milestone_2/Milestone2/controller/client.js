const express = require("express");
const router = express.Router();
let Connection=require("./../models/connection");
let ConnDB=require("./../util/connDB.js");

router.get("/", function(request, response) {
    let connDB = new ConnDB();
    var connDBlist = connDB.getConnections();
    response.render("client",{connDBlist: connDBlist});
});

//export the router
module.exports = router;
