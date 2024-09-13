const mongoose = require('mongoose');

const DrugAllergySchema = new mongoose.Schema({
    patientId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true 
    },
    content :{
        type:String ,
        ref: 'user',
    },
})
const DrugAllergy = mongoose.model('DrugAllergy',DrugAllergySchema);
module.exports = DrugAllergy;