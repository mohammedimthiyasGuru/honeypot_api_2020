var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var useraddModel = require('./../models/useraddModel');


router.post('/create', async function(req, res) {
  try{
 let doctor_specModels  =  await useraddModel.findOne({person_email:req.body.person_email});

  if(doctor_specModels == null){
    await useraddModel.create({
            usertype:  req.body.usertype,
            user_name :  req.body.user_name,
            user_role :  req.body.user_role,
            user_id :  req.body.user_id,
            staff_id :  req.body.staff_id,
            mobile_no :  req.body.mobile_no,
            whatsapp_no :  req.body.whatsapp_no,
            landline_no :  req.body.landline_no,
            ext_no :  req.body.ext_no,
            office_email :  req.body.office_email,
            person_email :  req.body.person_email,
            linked_url :  req.body.linked_url,
            fb_url :  req.body.fb_url,
            website :  req.body.website,
            current_address :  req.body.current_address,
            current_box :  req.body.current_box,
            current_pincode :  req.body.current_pincode,
            home_address :  req.body.home_address,
            home_box :  req.body.home_box,
            home_pincode :  req.body.home_pincode,
            photo :  req.body.photo,
            document_type :  req.body.document_type,
            hr_reporting :  req.body.hr_reporting,
            product_reporting  :  req.body.product_reporting,
            addedby : req.body.addedby,
            // delete_status : false
        }, 
        function (err, user) {
          console.log(user)
        res.json({Status:"Success",Message:"added successfully", Data : user ,Code:200}); 
        });
  }else{
      res.json({Status:"Failed",Message:"already person_email type added", Data : {},Code:500});
  }

       
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
});


router.post('/filter_date', function (req, res) {
        useraddModel.find({}, function (err, StateList) {
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
      useraddModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"designation type Deleted", Data : {} ,Code:200});     
      });
});


router.post('/getlist_id', function (req, res) {
        useraddModel.find({Person_id:req.body.Person_id}, function (err, StateList) {
          res.json({Status:"Success",Message:"designation type List", Data : StateList ,Code:200});
        });
});



router.get('/getlist', function (req, res) {
        useraddModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"designation type Details", Data : Functiondetails ,Code:200});
        });
});


router.get('/mobile/getlist', function (req, res) {
        useraddModel.find({}, function (err, Functiondetails) {
          let a = {
            usertypedata : Functiondetails
          }
          res.json({Status:"Success",Message:"designation type Details", Data : a ,Code:200});
        });
});

router.post('/edit', function (req, res) {
        useraddModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"designation type Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      useraddModel.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"designation type Deleted successfully", Data : {} ,Code:200});
      });
});


module.exports = router;
