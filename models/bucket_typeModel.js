var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var bucket_typeSchema = new mongoose.Schema({  
  client_name : String,
  product_name : String,
  bucket_type:  String,
  start_date : String,
  no_of_bucket : String,
  no_of_cycle : String,
  end_date : String,
  addedby : String
});
bucket_typeSchema.plugin(timestamps);
mongoose.model('bucket_type', bucket_typeSchema);
module.exports = mongoose.model('bucket_type');