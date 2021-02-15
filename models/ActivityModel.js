var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 

var ActivitySchema = new mongoose.Schema({  

  Type:  String,
  Person_id : String,
  Email_id : String,
  Activity_title : String,
  Activity_description : String,
  Date_and_Time : String

});
ActivitySchema.plugin(timestamps);
mongoose.model('Activity', ActivitySchema);
module.exports = mongoose.model('Activity');
