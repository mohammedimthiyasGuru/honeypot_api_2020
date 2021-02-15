var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var client_statusSchema = new mongoose.Schema({  
  client:  String,
  status : String,
  start_date : String,
  end_date : String,
  remarks : String,
  Attachment : String,
  addedby : String
});
client_statusSchema.plugin(timestamps);
mongoose.model('client_status', client_statusSchema);
module.exports = mongoose.model('client_status');