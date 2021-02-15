var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var userdetailSchema = new mongoose.Schema({  
  
  name : String,
  designation:  String,
  bankname : String,
  email_id : String,
  password : String,
  phone_number : String,
  access : Array,
  created_by : String,
  status : String,



});
userdetailSchema.plugin(timestamps);
mongoose.model('userdetail', userdetailSchema);
module.exports = mongoose.model('userdetail');