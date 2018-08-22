/**
* Module dependencies.
*/
var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path'),
	busboy = require("then-busboy"),
	fileUpload = require('express-fileupload'),
	app = express(),
	mysql      = require('mysql'),
	bodyParser=require("body-parser");
	

const mysqlx = require('@mysql/xdevapi');

const options = {
  host: 'localhost',
  port: 33060,
  password: '',
  user: 'root',
  schema: 'repixelated-db' // created by default
};
 
mysqlx
    .getSession(options)
    .then(session => {
        console.log(session.inspect());
        // { user: 'root', host: 'localhost', port: 33060, schema: 'mySchema' }
    })
 
// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
 
// development only
 
app.get('/', routes.index);//call for main index page
app.post('/', routes.index);//call for signup post 
app.get('/profile/:id',routes.profile);//to render users profile

//Middleware
app.listen(8080)
