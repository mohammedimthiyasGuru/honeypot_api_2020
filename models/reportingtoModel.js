var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var reporting_typeSchema = new mongoose.Schema({  
  reporting_type:  String,
  addedby : String
});
reporting_typeSchema.plugin(timestamps);
mongoose.model('reporting_type', reporting_typeSchema);
module.exports = mongoose.model('reporting_type');