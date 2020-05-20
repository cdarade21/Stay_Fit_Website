var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

var coursedetails = require('./routes/coursedetails.js');
var index = require('./routes/index.js');

app.use('/coursedetails',coursedetails);
app.use('/*',index);

app.listen(3000,function(){
    console.log('app started')
    console.log('listening on port 3000')
});
