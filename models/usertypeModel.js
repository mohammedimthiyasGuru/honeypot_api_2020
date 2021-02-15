var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var usertypeSchema = new mongoose.Schema({  
  usertype:  String,
  addedby : String
});
usertypeSchema.plugin(timestamps);
mongoose.model('usertype', usertypeSchema);
module.exports = mongoose.model('usertype');