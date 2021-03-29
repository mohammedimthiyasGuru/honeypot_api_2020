var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var useraddSchema = new mongoose.Schema({  
            usertype : String,
            user_name : String,
            user_role : String,
            user_id : String,
            staff_id : String,
            mobile_no : String,
            whatsapp_no : String,
            landline_no: String,
            ext_no : String,
            office_email : String,
            person_email : String,
            linked_url : String,
            fb_url : String,
            website : String,
            current_address : String,
            current_box : String,
            current_pincode : String,
            home_address : String,
            home_box : String,
            home_pincode : String,
            photo: String,
            document_type : Array,
            hr_reporting : Array,
            product_reporting  : Array,
            addedby : String
});
useraddSchema.plugin(timestamps);
mongoose.model('useradd', useraddSchema);
module.exports = mongoose.model('useradd');