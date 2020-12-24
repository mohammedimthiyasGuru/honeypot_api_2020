var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var entityuserSchema = new mongoose.Schema({  
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
entityuserSchema.plugin(timestamps);
mongoose.model('entityuser', entityuserSchema);
module.exports = mongoose.model('entityuser');
