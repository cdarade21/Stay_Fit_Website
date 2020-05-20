var express = require('express');
var router = express.Router();
var counter=0;
var app = express()
const path = process.cwd();

router.get('/', function (req, res) {
  //get data objects - this can be outside of this call if needed somewhere else.
  if (req.session.theCourse != undefined && req.session.theCourse != "") {
    console.log("session data exists");
	  courseModel = req.session.theCourse;
    res.render("details", { course: courseModel});
	}
	else if (Object.keys(req.query).length != 0) {
    console.log("request with query string was sent");
    courseModel = req.query;
    res.render("details", { course: courseModel});
	}
	else {
    console.log("request with no query string was sent and no session data exists");
    res.render("details", { message: "No course details available!" });

    //or can redirect to another view
    //response.sendFile(path + '/views/index.html');
  }
});

function countingMiddleware(req, res, next) {
  req.session.count = req.session.count+1;
  console.log('Count for form submission is: ' + req.session.count)
  next();
}

router.post('/',countingMiddleware,function(req,res){
  var course = require('./../models/course');
	console.log("query string is ");
	console.log(req.body);
	if (Object.keys(req.body).length != 0) {
	   course=req.body;
     req.session.theCourse=course
     res.render('details',{course: course});
	}
	else {
    console.log("request with no query string was sent");
    console.log("path from where node was started" + path);
    response.render("details", { message: "No course details available!" });
  }
});

//clear session route hanlder
router.get("/clearsession", function(request, response, next) {
  request.session.destroy();
  response.sendFile(path + "/views/index");
});

//a default route for all type of requests that doesn't match a defined route (url)
//added at the end so it is invoked only if no other url matches in this stack
router.all("/*", function(request, response) {
  response.render("index",{count:req.counter});
});

module.exports = router;
