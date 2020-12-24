var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var clientSchema = new mongoose.Schema({  
  existing_type : String,
  account_type : String,
  set_primary : String,
  no_of_lincenese:  String,
  clienttype : String,
  country : String,
  client_short_code : String,
  Client_system_code : String,
  Clinet_name : String,
  website  : String,
  comm_email : String,
  password : String,
  logo : String,
  ho_address : String,
  off_address : String,
  contact_persons : Array,
  documents : Array,
  Account : Array
});
clientSchema.plugin(timestamps);
mongoose.model('client', clientSchema);
module.exports = mongoose.model('client');
