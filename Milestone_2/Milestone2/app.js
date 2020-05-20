//setup express to use for routing
let express = require('express');
let app = express();
let path=require('path');

//set view engine to EJS
app.set('view engine','ejs');

//set the path for static resources to be accessible
app.use('/assets', express.static('assets'));

let connections = require('./controller/connDetails.js');
let index = require('./controller/index.js');
let about = require('./controller/about.js');
let contact = require('./controller/contact.js');
let newConnection = require('./controller/newConnection.js');
let client = require('./controller/client.js');

app.use('/',index);
app.use('/index',index);
app.use('/about',about);
app.use('/contact',contact);
app.use('/newConnection',newConnection);
app.use('/connDetails',connections);
app.use('/Classes_Detail',connections);
app.use('/client',client);
app.use('/action_page',newConnection);

app.listen(8000);
