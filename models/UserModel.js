const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    patientNo: {
        type: Number,
        trim: true,
    },
    age: {
        type: String,
        trim: true,
    },
    sex: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    doctor: {
        type: String,
        trim: true,
    },
    dob: {
        type: String,
        trim: true,
    },
    date: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
