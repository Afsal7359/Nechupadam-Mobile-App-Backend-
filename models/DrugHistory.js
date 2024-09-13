const mongoose = require('mongoose');

const DrugHistorySchema = new mongoose.Schema({
    content:{
        type:String,
        require:true,
    },
    date:{
        type:String,
        require:true,
    },
    patientId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
})
const DrugHistory = mongoose.model('DrugHistory',DrugHistorySchema);
module.exports = DrugHistory;