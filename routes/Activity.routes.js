var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var ActivityModel = require('./../models/ActivityModel');
var entity_user_detailsModel = require('./../models/entity_user_detailsModel');
var client_detailsModel = require('./../models/client_detailsModel');



router.post('/create', async function(req, res) {
  try{

        await ActivityModel.create({
            Type:  req.body.Type,
            Person_id : req.body.Person_id,
            Email_id : req.body.Email_id,
            Activity_title : req.body.Activity_title,
            Activity_description : req.body.Activity_description,
            Date_and_Time : req.body.Date_and_Time,
        }, 
        function (err, user) {
          console.log(user)
        res.json({Status:"Success",Message:"Added successfully", Data : user ,Code:200}); 
        });
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
});


router.get('/deletes', function (req, res) {
      ActivityModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"ActivityModel Deleted", Data : {} ,Code:200});     
      });
});



router.post('/login',async function (req, res) {
  if(req.body.username == 'honey@gmail.com' && req.body.password == '12345'){
      let c = {
        "Name" : "super Admin",
        "type" : "super Admin",
        "email_id" : "honey@gmail.com",
        "password" : "12345",
        "_id" : "12345",
        "Role" : "Super Admin"
      }
      res.json({Status:"Success",Type : "Super Admin", Message:"User Details", Data : c ,Code:200});
  }else{
       var entity_details = await entity_user_detailsModel.findOne({comm_email:req.body.username,password:req.body.password});
       var client_details = await client_detailsModel.findOne({comm_email:req.body.username,password:req.body.password});
       console.log(entity_details,client_details);
       if(entity_details == null && client_details == null){
       res.json({Status:"Failed",Message:"Invalid Account", Data : {},Code:404});
       }else if(entity_details == null || client_details !== null){
        res.json({Status:"Success",Type : "Client Details", Message:"Client Details", Data : client_details ,Code:200});
       }else if(entity_details !== null || client_details == null){
        res.json({Status:"Success",Type : "Entity Details", Message:"Entity Details", Data : entity_details ,Code:200});
       }
  }
});


router.post('/forgotpassword',async function (req, res) {
  if(req.body.username == 'honey@gmail.com'){
      let c = {
        "Name" : "super Admin",
        "type" : "super Admin",
        "email_id" : "honey@gmail.com",
        "password" : "12345",
        "_id" : "12345",
        "Role" : "Super Admin"
      }
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mohammedimthi2395@gmail.com',
    pass: 'Mohammed2395@1'
  }
});
var mailOptions = {
  from: 'mohammedimthi2395@gmail.com',
  to: req.body.username,
  subject: 'Forgot Password',
  text: '12345'
};
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
      res.json({Status:"Success",Type : "Super Admin", Message:"User Details", Data : c ,Code:200});
  }else{
       var entity_details = await entity_user_detailsModel.findOne({comm_email:req.body.username,password:req.body.password});
       var client_details = await client_detailsModel.findOne({comm_email:req.body.username,password:req.body.password});
       console.log(entity_details,client_details);
       if(entity_details == null && client_details == null){
       res.json({Status:"Failed",Message:"Invalid Account", Data : {},Code:404});
       }
       else if(entity_details == null || client_details !== null){
        var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mohammedimthi2395@gmail.com',
    pass: 'Mohammed2395@1'
  }
});
var mailOptions = {
  from: 'mohammedimthi2395@gmail.com',
  to: client_details.comm_email,
  subject: 'Forgot Password',
  text: client_details.password
};
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
        res.json({Status:"Success",Type : "Client Details", Message:"Client Details", Data : client_details ,Code:200});
}
       else if(entity_details !== null || client_details == null){
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mohammedimthi2395@gmail.com',
    pass: 'Mohammed2395@1'
  }
});
var mailOptions = {
  from: 'mohammedimthi2395@gmail.com',
  to: entity_details.comm_email,
  subject: 'Forgot Password',
  text: entity_details.password
};
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
        res.json({Status:"Success",Type : "Entity Details", Message:"Entity Details", Data : entity_details ,Code:200});
    }
  }
});






router.post('/getlist_id', function (req, res) {
        ActivityModel.find({Person_id:req.body.Person_id}, function (err, StateList) {
          res.json({Status:"Success",Message:"State List", Data : StateList ,Code:200});
        });
});



router.get('/getlist', function (req, res) {
        ActivityModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"Functiondetails", Data : Functiondetails ,Code:200});
        });
});


router.post('/edit', function (req, res) {
        ActivityModel.findByIdAndUpdate(req.body.Activity_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Functiondetails Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      ActivityModel.findByIdAndRemove(req.body.Activity_id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"SubFunction Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;
