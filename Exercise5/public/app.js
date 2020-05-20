var express = require('express');
var app = express();
const session = require('express-session');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');

//set the path for static resources to be accessible
app.use('/assets', express.static('assets'));
app.use(session({secret: 'NBAD',saveUninitialized: true,resave: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/** 3 - using seperate route modules **/
var course = require('./routes/courseDetails.js');
var index=require('./routes/index.js');
app.use('/coursedetails',course);
app.use('/*',index);
app.listen(3000,function(){
    console.log('app started')
    console.log('listening on port 3000')
});
