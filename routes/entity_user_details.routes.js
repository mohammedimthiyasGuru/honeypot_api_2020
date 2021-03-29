var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var entity_user_detailsModel = require('./../models/entity_user_detailsModel');
router.post('/create', async function(req, res) {
  console.log(req.body);
  try{
        await entity_user_detailsModel.create({
            exising_new:  req.body.exising_new,
            account_type : req.body.account_type,
            setprimary : req.body.setprimary,
            primary_accont : req.body.primary_accont,
            clienttype : req.body.clienttype,
            country : req.body.country,
            state : req.body.state,
            Town : req.body.Town,
            currency : req.body.currency,
            Clinet_name : req.body.Clinet_name,
            website : req.body.website,
            client_short_code : req.body.client_short_code,
            Client_system_code : req.body.Client_system_code,
            communication_email : req.body.communication_email,
            comm_email : req.body.comm_email,
            logo : req.body.logo,
            ho_address : req.body.ho_address,
            ho_po_box : req.body.ho_po_box,
            ho_pincode : req.body.ho_pincode,
            off_address : req.body.off_address,
            off_po_box : req.body.off_po_box,
            off_pincode : req.body.off_pincode,
            no_of_lincenese : req.body.no_of_lincenese,
            currency_handling : req.body.currency_handling,
            password : "1234567890",
            contact_persons : req.body.contact_persons,
            documents : req.body.documents,
            Account : req.body.Account
        },async function (err, user) {
  var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mohammedimthi2395@gmail.com',
    pass: 'Mohammed2395@1'
  }
});

var mailOptions = {
  from: 'mohammedimthi2395@gmail.com',
  to: req.body.comm_email,
  subject: 'Password',
  text: '1234567890'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

          console.log(user)
        res.json({Status:"Success",Message:"Entity user added successfully", Data : user ,Code:200}); 
        });
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
});


router.get('/deletes', function (req, res) {
      entity_user_detailsModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"Entity user deleted", Data : {} ,Code:200});     
      });
});


router.post('/getlist_id', function (req, res) {
        entity_user_detailsModel.find({Person_id:req.body.Person_id}, function (err, StateList) {
          res.json({Status:"Success",Message:"Entity user List", Data : StateList ,Code:200});
        });
});


router.post('/find_code',async function (req, res) {
   let check_client_short_code  =  await entity_user_detailsModel.findOne({client_short_code:req.body.client_short_code});
   let check_system_short_code  =  await entity_user_detailsModel.findOne({Client_system_code:req.body.Client_system_code});
   console.log(check_client_short_code,check_system_short_code);
   if(check_client_short_code == null && check_system_short_code !== null){
    res.json({Status:"Success",Message:"System short Code already In", Data : {} ,Code:404});
   }if(check_client_short_code !== null && check_system_short_code == null){
    res.json({Status:"Success",Message:"Client short Code already In", Data : {} ,Code:400});
   }else if (check_client_short_code !== null && check_system_short_code !== null) {
        res.json({Status:"Success",Message:"Code already In", Data : {} ,Code:400});
   }else {
    res.json({Status:"Success",Message:"Not Available, You can Create", Data : {} ,Code:400});
   }
});


router.get('/getlist', function (req, res) {
        entity_user_detailsModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"Entity user get list", Data : Functiondetails ,Code:200});
        });
});


router.post('/edit', function (req, res) {
        entity_user_detailsModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Entity user updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      entity_user_detailsModel.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"Entity user deleted successfully", Data : {} ,Code:200});
      });
});

module.exports = router;
