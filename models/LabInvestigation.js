const mongoose = require('mongoose');
const LabInvestigationSchema = new mongoose.Schema({
    patientId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    image:{
        type:String,
        require:true,
    },
    name:{
        type:String,
        require:true,
    }
})
const LabInvestigation = mongoose.model('LabInvestigation',LabInvestigationSchema);
module.exports=LabInvestigation;