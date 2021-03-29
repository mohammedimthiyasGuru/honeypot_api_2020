var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var designation_typeSchema = new mongoose.Schema({  
  designation_type:  String,
  addedby : String
});
designation_typeSchema.plugin(timestamps);
mongoose.model('designation_type', designation_typeSchema);
module.exports = mongoose.model('designation_type');