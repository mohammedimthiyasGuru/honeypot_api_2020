var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var product_typeSchema = new mongoose.Schema({  
  product_type:  String,
  addedby : String
});
product_typeSchema.plugin(timestamps);
mongoose.model('product_type', product_typeSchema);
module.exports = mongoose.model('product_type');