const mongoose = require('mongoose');

const DrugAllergySchema = new mongoose.Schema({
    patientId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user',
    },
    content :{
        type:String ,
        required: true 
    },
})
const DrugAllergy = mongoose.model('DrugAllergy',DrugAllergySchema);
module.exports = DrugAllergy;