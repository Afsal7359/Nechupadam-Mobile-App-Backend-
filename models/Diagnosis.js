const mongoose = require('mongoose');
const DiagnosisSchema = new mongoose.Schema({
    patientId:{
        type:String,
        require:true,
    },
    content :{
        type:String,
        require:true,
    }
})
const Diagnosis = mongoose.model('Diagnosis',DiagnosisSchema);
module.exports=Diagnosis;