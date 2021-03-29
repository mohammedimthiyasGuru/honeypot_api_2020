var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var currency_typeSchema = new mongoose.Schema({  
  currency_type:  String,
  country_name : String,
  addedby : String
});
currency_typeSchema.plugin(timestamps);
mongoose.model('currency_type', currency_typeSchema);
module.exports = mongoose.model('currency_type');