//Main app file

//setup express to use for routing
let express = require('express');
let app = express();
let path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');

//set view engine to EJS
app.set('view engine','ejs');

//set the path for static resources to be accessible
app.use(session({secret: 'NBAD', saveUninitialized: true, resave: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/assets', express.static('assets'));

// Setting variables
let connections = require('./controller/connDetails.js');
let index = require('./controller/index.js');
let about = require('./controller/about.js');
let contact = require('./controller/contact.js');
let newConnection = require('./controller/newConnection.js');
let client = require('./controller/client.js');
let login = require('./controller/login.js');

//Routes
app.use('/',index);
app.use('/index',index);
app.use('/about',about);
app.use('/contact',contact);
app.use('/newConnection',newConnection);
app.use('/connDetails',connections);
app.use('/Classes_Detail',connections);
app.use('/client',client);
app.use('/action_page',newConnection);
app.use('/login',login);
app.use('/*',index);
app.listen(3000);
