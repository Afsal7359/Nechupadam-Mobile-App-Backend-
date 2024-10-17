const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    time:{
        type:String,
    },
    patientId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    patientName:{
        type:String,
    },
    patientAddress:{
        type:String,
    },
    patientNumber:{
        type:String,
    },
    procedure:{
        type:String
    },
    remarks:{
        type:String
    },
    date:{
        type:String
    }
})
const Booking = mongoose.model('Booking',BookingSchema);
module.exports=Booking;