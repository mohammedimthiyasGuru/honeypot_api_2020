var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var mergedetailSchema = new mongoose.Schema({  
  
  
  company_id : {
          type: Schema.Types.ObjectId,
          ref: 'userdetail'
      },
  company_name:  String,
  report_to : String,
  report_to_id : {
          type: Schema.Types.ObjectId,
          ref: 'userdetail'
      },
  user : String,
  user_id : {
          type: Schema.Types.ObjectId,
          ref: 'userdetail'
      },
  created_by : String,
  status : String,


});
mergedetailSchema.plugin(timestamps);
mongoose.model('mergedetail', mergedetailSchema);
module.exports = mongoose.model('mergedetail');