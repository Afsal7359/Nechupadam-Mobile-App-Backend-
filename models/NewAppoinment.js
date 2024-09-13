const mongoose = require('mongoose');
const NewAppoinmentSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    comment:{
        type:String,
        require:true
    },
    attended:{
        type:String,
        require:true,
    },
    date:{
        type:String,
        require:true
    }
})
const NewAppoinmnet = mongoose.model('NewAppoinmnet',NewAppoinmentSchema);
module.exports=NewAppoinmnet;