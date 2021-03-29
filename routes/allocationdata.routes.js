var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var allocationdataModel = require('./../models/allocationdataModel');


router.post('/create', async function(req, res) {
  try{
 let doctor_specModels  =  await allocationdataModel.findOne({portfolio_type:req.body.portfolio_type});

  if(doctor_specModels == null){
    await allocationdataModel.create({
            user_email:  req.body.user_email,
            user_id : req.body.user_id,
            Date : req.body.Date,
            headers :  req.body.headers,
            datas : req.body.datas,
            Date_and_Time : req.body.Date_and_Time
            // delete_status : false
        }, 
        function (err, user) {
          console.log(user)
        res.json({Status:"Success",Message:"portfolio type added successfully", Data : user ,Code:200}); 
        });
  }else{
      res.json({Status:"Failed",Message:"already portfolio type added", Data : {},Code:500});
  }

       
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
});


router.post('/filter_date', function (req, res) {
        allocationdataModel.find({}, function (err, StateList) {
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
              res.json({Status:"Success",Message:"portfolio type  List", Data : final_Date ,Code:200});
            }
          }
        });
});




router.get('/deletes', function (req, res) {
      allocationdataModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"portfolio type Deleted", Data : {} ,Code:200});     
      });
});


router.post('/getlist_id', function (req, res) {
        allocationdataModel.find({user_email:req.body.user_email}, function (err, StateList) {
          res.json({Status:"Success",Message:"portfolio type List", Data : StateList ,Code:200});
        });
});


router.get('/getlist', function (req, res) {
        allocationdataModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"portfolio type Details", Data : Functiondetails ,Code:200});
        });
});


router.get('/mobile/getlist', function (req, res) {
        allocationdataModel.find({}, function (err, Functiondetails) {
          let a = {
            usertypedata : Functiondetails
          }
          res.json({Status:"Success",Message:"portfolio type Details", Data : a ,Code:200});
        });
});

router.post('/edit', function (req, res) {
        allocationdataModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"portfolio type Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      allocationdataModel.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"portfolio type Deleted successfully", Data : {} ,Code:200});
      });
});


module.exports = router;
