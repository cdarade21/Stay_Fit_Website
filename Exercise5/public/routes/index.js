var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  if(!req.session.count){
    req.session.count=0
  }
  res.render('index',{count:req.session.count})
})

module.exports = router;
