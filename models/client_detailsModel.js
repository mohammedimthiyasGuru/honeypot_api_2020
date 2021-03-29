var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var clientSchema = new mongoose.Schema({  
  exising_new : String,
  account_type : String,
  setprimary : String,
  primary_accont : String,
  clienttype : Array,
  country : String,
  state : String,
  Town : String,
  currency : String,
  Clinet_name : String,
  website  : String,
  client_short_code : String,
  Client_system_code : String,
  communication_email : String,
  comm_email : String,
  logo : String,
  ho_address : String,
  ho_po_box : String,
  ho_pincode : String,
  off_address : String,
  off_po_box : String,
  off_pincode : String,
  // no_of_lincenese:  String,
  currency_handling : Array,
  password : String,
  contact_persons : Array,
  documents : Array,
  Account : Array
});
clientSchema.plugin(timestamps);
mongoose.model('client', clientSchema);
module.exports = mongoose.model('client');
