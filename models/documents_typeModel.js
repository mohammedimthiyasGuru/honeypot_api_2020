var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var document_typeSchema = new mongoose.Schema({  
  document_type:  String,
  addedby : String
});
document_typeSchema.plugin(timestamps);
mongoose.model('document_type', document_typeSchema);
module.exports = mongoose.model('document_type');