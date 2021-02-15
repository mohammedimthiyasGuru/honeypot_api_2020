var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var field_mapping_detailsModel = require('./../models/field_mapping_detailsModel');


router.post('/create', async function(req, res) {
  try{
    await field_mapping_detailsModel.create({
            bank:  req.body.bank,
            product : req.body.product,
            portfolio : req.body.portfolio,
            fields_details : req.body.fields_details,
            addedby : req.body.addedby,
            // delete_status : false
        }, 
        function (err, user) {
          console.log(user)
        res.json({Status:"Success",Message:"Field added successfully", Data : user ,Code:200}); 
        });   
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
});





router.post('/fetch_field_list', async function(req, res) {
  field_mapping_detailsModel.find({bank:req.body.bank,product:req.body.product,portfolio:req.body.portfolio}, function (err, StateList) {
     console.log(StateList.length);
     if(StateList.length == 0){
       res.json({Status:"Failed",Message:"No data Found", Data : {} ,Code:404});
     }else{
      res.json({Status:"Success",Message:"Saved Field list", Data : StateList ,Code:200});
     }
        });
});








router.post('/filter_date', function (req, res) {
        field_mapping_detailsModel.find({}, function (err, StateList) {
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
              res.json({Status:"Success",Message:"product type  List", Data : final_Date ,Code:200});
            }
          }
        });
});




router.get('/deletes', function (req, res) {
      field_mapping_detailsModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"product type Deleted", Data : {} ,Code:200});     
      });
});


router.post('/getlist_id', function (req, res) {
        field_mapping_detailsModel.find({Person_id:req.body.Person_id}, function (err, StateList) {
          res.json({Status:"Success",Message:"product type List", Data : StateList ,Code:200});
        });
});



router.get('/getlist', function (req, res) {
        field_mapping_detailsModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"product type Details", Data : Functiondetails ,Code:200});
        });
});


router.get('/mobile/getlist', function (req, res) {
        field_mapping_detailsModel.find({}, function (err, Functiondetails) {
          let a = {
            usertypedata : Functiondetails
          }
          res.json({Status:"Success",Message:"product type Details", Data : a ,Code:200});
        });
});

router.post('/edit',async function (req, res) {
   let field_mapp_details  =  await field_mapping_detailsModel.findOne({bank:req.body.bank,product:req.body.product,portfolio:req.body.portfolio});
   console.log(field_mapp_details);
        field_mapping_detailsModel.findByIdAndUpdate(field_mapp_details._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"product type Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      field_mapping_detailsModel.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"product type Deleted successfully", Data : {} ,Code:200});
      });
});


module.exports = router;
