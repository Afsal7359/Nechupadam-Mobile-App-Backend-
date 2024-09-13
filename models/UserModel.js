const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    name:{
        type:String,
        trim:true,
        require:true,
    },
    email:{
        type:String,
        require:true,
        trim:true,
    },
    phone:{
        type:String,
        require:true,
        trim:true,
    },
    password:{
        type:String,
        require:true,
        trim:true
    }
})
const  User = mongoose.model('user',UserSchema);
module.exports = User;