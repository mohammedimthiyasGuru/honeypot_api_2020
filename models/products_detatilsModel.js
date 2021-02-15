var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var products_detatilSchema = new mongoose.Schema({  
  client_name:  String,
    business_divi:  String,
      product_name:  String,
        profolio:  String,
  addedby : String
});
products_detatilSchema.plugin(timestamps);
mongoose.model('products_detatil', products_detatilSchema);
module.exports = mongoose.model('products_detatil');