const mongoose = require('mongoose');

const DentalHistorySchema = new mongoose.Schema({
        content:{
            type:String,
            require:true
        },
        date:{
            type:String,
            require:true,
        },
        patientId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        }
})
const DentalHistory = mongoose.model('DentalHistory',DentalHistorySchema);
module.exports= DentalHistory;