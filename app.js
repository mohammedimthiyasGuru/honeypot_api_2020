var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');	
var fileUpload = require('express-fileupload');
var pdf = require('html-pdf');
const puppeteer = require('puppeteer');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
var fs = require('fs');
var pug = require ('pug');
var responseMiddleware = require('./middlewares/response.middleware');


var ActivityRouter = require('./routes/Activity.routes');
var Entity_user = require('./routes/entity_user_details.routes');
var client_details = require('./routes/client_details.routes');




/*Database connectivity*/
var BaseUrl = "http://54.202.108.76:3000/api"; 
const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/Salveo'); 
var db = mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
    console.log("connection succeeded"); 
}) 

var app = express();

app.use(fileUpload());
app.use(responseMiddleware());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('view engine', 'pug');

/*Response settings*/

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
  next();
});





app.post('/pdfgenerator', async function(req, res, next) {
      try{
       var source = fs.readFileSync(path.resolve(__dirname, "./views/doctor.pug"),'utf-8');
		 let template = pug.compile(source);
		 let data = {
		 	name : "Hai",
		 	url: "apple.com"
		 }
		 let html = template(data);
		 //console.log(html)
		 console.log("What is the path" , __dirname)
        var options = { format: 'Letter', height: "20.5in",
  width: "18in"};
        var filepath = __dirname + '/public/prescriptions/' + uuidv4() + '.pdf' ;
      	var filepart = filepath.slice(47,87);
      	console.log(filepart)
        var Finalpath = BaseUrl +'/api/prescriptions/' + filepart;
        console.log(Finalpath)
       await pdf.create(html, options).toFile(filepath, function(err, response) {
          if (err) return console.log(err);
         res.json({Status:"Success",Message:"Prescriptiondetails", Data :Finalpath ,Code:200});
    });
        //var html = pug.compileFile(layout, { pretty: true })(locals);
      }
      catch(e){
        console.log(e)
        res.json({Status:"Failed",Message:"Internal server error", Data : {} ,Code:500});
      }
});

app.post('/upload', function(req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    res.error(300,'No files were uploaded.');
    return;
  }

  console.log('req.files >>>', req.files); // eslint-disable-line

  sampleFile = req.files.sampleFile;

  uploadPath = __dirname + '/public/uploads/' + sampleFile.name;

  var Finalpath =  BaseUrl +'/uploads/'+ sampleFile.name;
   console.log("uploaded path",uploadPath )


  sampleFile.mv(uploadPath, function(err) {
    if (err) {
   console.log(err)
   return res.error(500, "Internal server error");
    }
   res.json({Status:"Success",Message:"file upload success", Data :Finalpath,Code:200});
  });
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api/', express.static(path.join(__dirname, 'public')));
app.use('/api/', express.static(path.join(__dirname, 'routes')));


app.use ('/api/activity', ActivityRouter);
app.use ('/api/entity_user', Entity_user);
app.use ('/api/client_details', client_details);








// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));

});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
