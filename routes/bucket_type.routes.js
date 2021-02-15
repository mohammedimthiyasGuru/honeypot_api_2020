var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var bucket_typeModel = require('./../models/bucket_typeModel');


router.post('/create', async function(req, res) {
  try{
 let doctor_specModels  =  await bucket_typeModel.findOne({bucket_type:req.body.bucket_type});

  if(doctor_specModels == null){
    await bucket_typeModel.create({
            client_name:  req.body.client_name,
            product_name:  req.body.product_name,
            bucket_type:  req.body.bucket_type,
            start_date:  req.body.start_date,
            end_date:  req.body.end_date,
            no_of_bucket :req.body.no_of_bucket,
            no_of_cycle : req.body.no_of_cycle,
            addedby : req.body.addedby,

            // delete_status : false
        }, 
        function (err, user) {
          console.log(user)
        res.json({Status:"Success",Message:"bucket type added successfully", Data : user ,Code:200}); 
        });
  }else{
      res.json({Status:"Failed",Message:"already bucket type added", Data : {},Code:500});
  }

       
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
});


router.post('/filter_date', function (req, res) {
        bucket_typeModel.find({}, function (err, StateList) {
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
              res.json({Status:"Success",Message:"bucket type  List", Data : final_Date ,Code:200});
            }
          }
        });
});




router.get('/deletes', function (req, res) {
      bucket_typeModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"bucket type Deleted", Data : {} ,Code:200});     
      });
});


router.post('/getlist_id', function (req, res) {
        bucket_typeModel.find({Person_id:req.body.Person_id}, function (err, StateList) {
          res.json({Status:"Success",Message:"bucket type List", Data : StateList ,Code:200});
        });
});



router.get('/getlist', function (req, res) {
        bucket_typeModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"bucket type Details", Data : Functiondetails ,Code:200});
        });
});


router.get('/mobile/getlist', function (req, res) {
        bucket_typeModel.find({}, function (err, Functiondetails) {
          let a = {
            usertypedata : Functiondetails
          }
          res.json({Status:"Success",Message:"bucket type Details", Data : a ,Code:200});
        });
});

router.post('/edit', function (req, res) {
        bucket_typeModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"bucket type Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      bucket_typeModel.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"bucket type Deleted successfully", Data : {} ,Code:200});
      });
});


module.exports = router;
