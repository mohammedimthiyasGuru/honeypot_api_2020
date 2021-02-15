var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var client_statusModel = require('./../models/client_statusModel');


router.post('/create', async function(req, res) {
  try{
 let doctor_specModels  =  await client_statusModel.findOne({client_type:req.body.client_type});

  if(doctor_specModels == null){
    await client_statusModel.create({
            client:  req.body.client,
            status:  req.body.status,
            start_date:  req.body.start_date,
            end_date:  req.body.end_date,
            remarks:  req.body.remarks,
            Attachment : req.body.Attachment,
            addedby : req.body.addedby,
            // delete_status : false
        }, 
        function (err, user) {
          console.log(user)
        res.json({Status:"Success",Message:"client status added successfully", Data : user ,Code:200}); 
        });
  }else{
      res.json({Status:"Failed",Message:"already client status added", Data : {},Code:500});
  }

       
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
});


router.post('/filter_date', function (req, res) {
        client_statusModel.find({}, function (err, StateList) {
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
              res.json({Status:"Success",Message:"client status  List", Data : final_Date ,Code:200});
            }
          }
        });
});




router.get('/deletes', function (req, res) {
      client_statusModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"client status Deleted", Data : {} ,Code:200});     
      });
});


router.post('/getlist_id', function (req, res) {
        client_statusModel.find({Person_id:req.body.Person_id}, function (err, StateList) {
          res.json({Status:"Success",Message:"client status List", Data : StateList ,Code:200});
        });
});



router.get('/getlist', function (req, res) {
        client_statusModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"client status Details", Data : Functiondetails ,Code:200});
        });
});


router.get('/mobile/getlist', function (req, res) {
        client_statusModel.find({}, function (err, Functiondetails) {
          let a = {
            usertypedata : Functiondetails
          }
          res.json({Status:"Success",Message:"client status Details", Data : a ,Code:200});
        });
});

router.post('/edit', function (req, res) {
        client_statusModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"client status Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      client_statusModel.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"client status Deleted successfully", Data : {} ,Code:200});
      });
});


module.exports = router;
