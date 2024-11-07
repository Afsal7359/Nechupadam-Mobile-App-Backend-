const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    amount:{
        type:Number,
        require:true
    },
    date:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true    
    },
    paymentMethod:{
        type:String,
        require:true
    },
    type:{
        type:String,
        require:true
    }
})
const Payment = mongoose.model('Payment',PaymentSchema);
module.exports=Payment;    