var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var session = require('express-session');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var thecourse = require('./../models/Course');

router.use(session({
  name: 'server-session-cookie-id',
  secret: 'my express secret',
  saveUninitialized: true,
  resave: true
}));

router.post('/', urlencodedParser, function (req, res) {
  thecourse = req.body
  req.session.theCourse = thecourse;
  res.redirect('courseDetails')
});

router.get('/', function (req, res) {
  var sessData = req.session.theCourse
  if (sessData.courseID && sessData.title && sessData.term && sessData.instructor){
    res.render('details',{thecourse: req.session.theCourse});
  }
  else {
    res.redirect('index')
  }
});

module.exports = router;
