const Notification = require("../../models/Notification");

module.exports ={

    AddNotification : async(req,res)=>{
        try {
            const  {message,patientId} = req.body;
            if(!message){
                return res.status(400).json({success:false,message:"Message is required"})
            }else if(!patientId){
                return res.status(400).json({success:false,message:"Patient ID is required"})
            }
            const Newmessage = new Notification({
                message,patientId
            })
            await Newmessage.save()
            return res.status(200).json({
                success:true,message:"Notification Added Successfully"
            })
        } catch (error) {
           return res.status(500).json({success:false,message:"server error"})
        }
    },
    GetNotificationById: async(req,res)=>{
        try {
            const {id}= req.query
            if(!id){
                return res.status(400).json({success:false,message:"ID is required"})
            }
            const Data = await Notification.find({patientId:id}).sort({_id:-1})
      
            return res.status(200).json({success:true,message:"notification data retrieved successfully",data:Data})
        } catch (error) {
           return res.status(500).json({ success:false,message:"server error"})
        }
    }

}