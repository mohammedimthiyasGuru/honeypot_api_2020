var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var userstatusmarkingSchema = new mongoose.Schema({  
  userstatusmarking:  String,
  addedby : String
});
userstatusmarkingSchema.plugin(timestamps);
mongoose.model('userstatusmarking', userstatusmarkingSchema);
module.exports = mongoose.model('userstatusmarking');