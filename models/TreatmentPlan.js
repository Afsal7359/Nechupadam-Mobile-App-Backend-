const mongoose = require('mongoose');
const TreatmentPlanSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    content:{
        type:String,
        require:true
    },
    date:{
        type:String,
        require:true
    }
})
const TreatmentPlan = mongoose.model('TreatmentPlan',TreatmentPlanSchema);
module.exports=TreatmentPlan;