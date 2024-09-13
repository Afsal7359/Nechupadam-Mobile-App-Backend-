const mongoose = require('mongoose');

const ChiefComplaintSchema = new mongoose.Schema({
        content:{
            type:String,
            require:true
        },
        date:{
            type:String,
            require:true,
        },
        patientId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        }
})
const CheifComplaint = mongoose.model('CheifComplaints',ChiefComplaintSchema);
module.exports= CheifComplaint;