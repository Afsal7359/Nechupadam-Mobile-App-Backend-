const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    due:{
        type:Number,
        require:true
    },
    fee:{
        type:Number,
        require:true
    },
    payment:{
        type:Number,
        require:true
    },
    paymentItems:[{
        amount:{
            type:Number,
            require:true
        },
        date:{
            type:String,
            require:true
        },
        paymentMethod:{
            type:String,
            require:true
        },
        installment:{
            type:Boolean,
            require:true
        }
    }]
})
const Payment = mongoose.model('Payment',PaymentSchema);
module.exports=Payment;    