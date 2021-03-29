var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var portfolio_typeSchema = new mongoose.Schema({  
  portfolio_type:  String,
  addedby : String
});
portfolio_typeSchema.plugin(timestamps);
mongoose.model('portfolio_type', portfolio_typeSchema);
module.exports = mongoose.model('portfolio_type');