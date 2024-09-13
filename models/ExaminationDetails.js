const mongoose = require('mongoose');
const ExaminationSchema = new mongoose.Schema({
    content:{
        type:String,
        require:true,
    },
    patientId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    date:{
        type:String,
        require:true,
    },
})
const ExaminationDetails = mongoose.model('ExaminationDeatils',ExaminationSchema);
module.exports=ExaminationDetails;