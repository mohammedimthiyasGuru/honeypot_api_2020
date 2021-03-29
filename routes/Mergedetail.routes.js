var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var MergedetailsModel = require('./../models/MergedetailsModel');


router.post('/create', async function(req, res) {
  try{
    await MergedetailsModel.create({

  company_id : req.body.company_id,
  company_name:  req.body.company_name,
  report_to : req.body.report_to,
  report_to_id : req.body.report_to_id,
  user : req.body.user,
  user_id : req.body.user_id,
  created_by : req.body.created_by,
  status  : req.body.status,

  
        }, 
        function (err, user) {
          console.log(user)
        res.json({Status:"Success",Message:"User details added successfully", Data : user ,Code:200}); 
        });      
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
});


router.post('/filter_date', function (req, res) {
        MergedetailsModel.find({}, function (err, StateList) {
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
      MergedetailsModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"designation type Deleted", Data : {} ,Code:200});     
      });
});


router.post('/getlist_id', function (req, res) {
        MergedetailsModel.find({Person_id:req.body.Person_id}, function (err, StateList) {
          res.json({Status:"Success",Message:"designation type List", Data : StateList ,Code:200});
        });
});


router.post('/userlist_by_com', function (req, res) {
        MergedetailsModel.find({bankname:req.body.bankname,designation:req.body.designation}, function (err, StateList) {
          res.json({Status:"Success",Message:"User details", Data : StateList ,Code:200});
        });
});


router.get('/getlist', function (req, res) {
        MergedetailsModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"designation type Details", Data : Functiondetails ,Code:200});
        }).populate('company_id report_to_id user_id');
});


router.get('/mobile/getlist', function (req, res) {
        MergedetailsModel.find({}, function (err, Functiondetails) {
          let a = {
            usertypedata : Functiondetails
          }
          res.json({Status:"Success",Message:"designation type Details", Data : a ,Code:200});
        });
});

router.post('/edit', function (req, res) {
        MergedetailsModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"designation type Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      MergedetailsModel.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"User details delete successfully", Data : {} ,Code:200});
      });
});


module.exports = router;
