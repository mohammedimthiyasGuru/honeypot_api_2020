var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var UserdetailsModel = require('./../models/UserdetailsModel');


router.post('/create', async function(req, res) {
  try{
 let doctor_specModels  =  await UserdetailsModel.findOne({email_id:req.body.email_id});

  if(doctor_specModels == null){
    await UserdetailsModel.create({

  name : req.body.name,
  designation:  req.body.designation,
  bankname : req.body.bankname,
  email_id : req.body.email_id,
  password : req.body.password,
  phone_number : req.body.phone_number,
  access : req.body.access,
  created_by : req.body.created_by,
  status  : req.body.status,

        }, 
        function (err, user) {
          console.log(user)
        res.json({Status:"Success",Message:"User details added successfully", Data : user ,Code:200}); 
        });
  }else{
      res.json({Status:"Failed",Message:"Email Id already exists", Data : {},Code:500});
  }

       
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
});


router.post('/filter_date', function (req, res) {
        UserdetailsModel.find({}, function (err, StateList) {
          var final_Date = [];
          for(let a = 0; a < StateList.length; a ++){
            var fromdate = new Date(req.body.fromdate);
            var todate = new Date(req.body.todate);
            var checkdate = new Date(StateList[a].createdAt);
            console.log(fromdate,todate,checkdate);
            if(checkdate >= fromdate && checkdate <= todate){
              final_Date.push(StateList[a]);
            }
            if(a == StateList.length - 1){
              res.json({Status:"Success",Message:"designation type  List", Data : final_Date ,Code:200});
            }
          }
        });
});




router.get('/deletes', function (req, res) {
      UserdetailsModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"designation type Deleted", Data : {} ,Code:200});     
      });
});


router.post('/getlist_id', function (req, res) {
        UserdetailsModel.find({Person_id:req.body.Person_id}, function (err, StateList) {
          res.json({Status:"Success",Message:"designation type List", Data : StateList ,Code:200});
        });
});


router.post('/login', function (req, res) {
        UserdetailsModel.findOne({ email_id : req.body.email_id,password : req.body.password}, function (err, StateList) {
          res.json({Status:"Success",Message:"Login Details", Data : StateList ,Code:200});
        });
});


router.post('/userlist_by_com', function (req, res) {
        UserdetailsModel.find({bankname:req.body.bankname,designation:req.body.designation}, function (err, StateList) {
          res.json({Status:"Success",Message:"User details", Data : StateList ,Code:200});
        });
});


router.get('/getlist', function (req, res) {
        UserdetailsModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"designation type Details", Data : Functiondetails ,Code:200});
        });
});


router.get('/mobile/getlist', function (req, res) {
        UserdetailsModel.find({}, function (err, Functiondetails) {
          let a = {
            usertypedata : Functiondetails
          }
          res.json({Status:"Success",Message:"designation type Details", Data : a ,Code:200});
        });
});

router.post('/edit', function (req, res) {
        UserdetailsModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"designation type Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      UserdetailsModel.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"User details delete successfully", Data : {} ,Code:200});
      });
});


module.exports = router;
