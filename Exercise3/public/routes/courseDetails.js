var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
  var courseModel = require('./../models/Course');
  res.render('details',{courseModel: req.query});
});

module.exports = router;
