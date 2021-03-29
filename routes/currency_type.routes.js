var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var currency_typeModel = require('./../models/currency_typeModel');


router.post('/create', async function(req, res) {
  try{
 let doctor_specModels  =  await currency_typeModel.findOne({currency_type:req.body.currency_type});

  if(doctor_specModels == null){
    await currency_typeModel.create({
            currency_type:  req.body.currency_type,
            country_name : req.body.country_name,
            addedby : req.body.addedby,
            // delete_status : false
        }, 
        function (err, user) {
          console.log(user)
        res.json({Status:"Success",Message:"currency type added successfully", Data : user ,Code:200}); 
        });
  }else{
      res.json({Status:"Failed",Message:"already currency type added", Data : {},Code:500});
  }

       
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
});


router.post('/filter_date', function (req, res) {
        currency_typeModel.find({}, function (err, StateList) {
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
              res.json({Status:"Success",Message:"currency type  List", Data : final_Date ,Code:200});
            }
          }
        });
});




router.get('/deletes', function (req, res) {
      currency_typeModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"currency type Deleted", Data : {} ,Code:200});     
      });
});


router.post('/getlist_id', function (req, res) {
        currency_typeModel.find({Person_id:req.body.Person_id}, function (err, StateList) {
          res.json({Status:"Success",Message:"currency type List", Data : StateList ,Code:200});
        });
});


router.get('/getlist', function (req, res) {
        currency_typeModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"currency type Details", Data : Functiondetails ,Code:200});
        });
});


router.get('/mobile/getlist', function (req, res) {
        currency_typeModel.find({}, function (err, Functiondetails) {
          let a = {
            usertypedata : Functiondetails
          }
          res.json({Status:"Success",Message:"currency type Details", Data : a ,Code:200});
        });
});

router.post('/edit', function (req, res) {
        currency_typeModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"currency type Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      currency_typeModel.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"currency type Deleted successfully", Data : {} ,Code:200});
      });
});


module.exports = router;
