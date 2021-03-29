var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var field_mapping_detailSchema = new mongoose.Schema({  
  bank :  String,
  product :  String,
  portfolio :  String,
  fields_details :  Array,
  addedby : String
});
field_mapping_detailSchema.plugin(timestamps);
mongoose.model('field_mapping_detail', field_mapping_detailSchema);
module.exports = mongoose.model('field_mapping_detail');