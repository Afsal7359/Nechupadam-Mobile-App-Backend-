const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
        username :{
            type:String,
            require:true
        },
        password:{
            type:String,
            require:true
        }
})
const DoctorLog = mongoose.model("DoctorLogin",DoctorSchema);
module.exports = DoctorLog;