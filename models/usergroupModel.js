var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var usergroupSchema = new mongoose.Schema({  
  usergroup:  String,
  addedby : String
});
usergroupSchema.plugin(timestamps);
mongoose.model('usergroup', usergroupSchema);
module.exports = mongoose.model('usergroup');