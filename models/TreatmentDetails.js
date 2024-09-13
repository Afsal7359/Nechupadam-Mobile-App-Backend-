const mongoose = require('mongoose');
const TreatmentDetailSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    content:{
        type:String,
        require:true
    },
})
const TreatmentDeatils = mongoose.model('TreatmentDeatils',TreatmentDetailSchema);
module.exports=TreatmentDeatils;