var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var entity_user_detailsModel = require('./../models/entity_user_detailsModel');


router.post('/create', async function(req, res) {
  try{

        await entity_user_detailsModel.create({
            no_of_lincenese:  req.body.no_of_lincenese,
            clienttype : req.body.clienttype,
            country : req.body.country,
            client_short_code : req.body.client_short_code,
            Client_system_code : req.body.Client_system_code,
            Clinet_name : req.body.Clinet_name,
             website : req.body.website,
             comm_email : req.body.comm_email,
             password : "1234567890",
             logo : req.body.logo,
              ho_address : req.body.ho_address,
               off_address : req.body.off_address,
              contact_persons : req.body.contact_persons,
              documents : req.body.documents,
              Account : req.body.Account,
        }, 
        function (err, user) {
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



router.get('/getlist', function (req, res) {
        entity_user_detailsModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"Entity user get list", Data : Functiondetails ,Code:200});
        });
});


router.post('/edit', function (req, res) {
        entity_user_detailsModel.findByIdAndUpdate(req.body.Activity_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Entity user updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      entity_user_detailsModel.findByIdAndRemove(req.body.Activity_id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"Entity user deleted successfully", Data : {} ,Code:200});
      });
});

module.exports = router;
