var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var state_detailsSchema = new mongoose.Schema({  
  country_name : String,
  state:  String,
  addedby : String
});
state_detailsSchema.plugin(timestamps);
mongoose.model('state_details', state_detailsSchema);
module.exports = mongoose.model('state_details');