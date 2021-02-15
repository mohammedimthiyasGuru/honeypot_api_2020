var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var account_typeSchema = new mongoose.Schema({  
  account_type:  String,
  addedby : String
});
account_typeSchema.plugin(timestamps);
mongoose.model('account_type', account_typeSchema);
module.exports = mongoose.model('account_type');