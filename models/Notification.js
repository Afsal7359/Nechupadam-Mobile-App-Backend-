const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    message:{
        type:String,
    },
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    },
    date: {
        type: Date,
        default: Date.now,
    },
})
const Notification = mongoose.model('notification',NotificationSchema);
module.exports=Notification;