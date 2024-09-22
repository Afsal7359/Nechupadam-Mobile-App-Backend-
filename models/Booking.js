const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    time:{
        type:String,
    },
    patientId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
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