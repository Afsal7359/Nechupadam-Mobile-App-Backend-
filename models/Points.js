const mongoose = require('mongoose');
const PointsSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    content:{
        type:String,
        require:true
    },
})
const Points = mongoose.model('Points',PointsSchema);
module.exports=Points;