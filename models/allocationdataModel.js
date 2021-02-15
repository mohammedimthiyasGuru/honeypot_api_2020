var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 

var allocationdataSchema = new mongoose.Schema({  

  user_email:  String,
  user_id : String,
  Date : String,
  headers : Array,
  datas : Array,
  Date_and_Time : String

});
allocationdataSchema.plugin(timestamps);
mongoose.model('allocationdata', allocationdataSchema);
module.exports = mongoose.model('allocationdata');
