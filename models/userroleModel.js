var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var userroleSchema = new mongoose.Schema({  
  userrole:  String,
  addedby : String
});
userroleSchema.plugin(timestamps);
mongoose.model('userrole', userroleSchema);
module.exports = mongoose.model('userrole');