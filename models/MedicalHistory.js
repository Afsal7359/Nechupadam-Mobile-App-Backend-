const mongoose = require('mongoose');

const MedicalHistorySchema = new mongoose.Schema({
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
const MedicalHistory = mongoose.model('MedicalHistory',MedicalHistorySchema);
module.exports= MedicalHistory;