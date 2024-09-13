const mongoose = require('mongoose');
const MedicineSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    content:{
        type:String,
        require:true
    },
})
const Medicine = mongoose.model('Medicine',MedicineSchema);
module.exports=Medicine;