const NewAppoinmnet = require("../../models/NewAppoinment");


module.exports={
    AddNewAppoinment : async(req,res)=>{
        try {
            const {date,attended, comment,patientId}=req.body;

            if(!date){
                return res.status(400).json({
                    success:false,
                    message:"Date is required"
                })
            }else if(!comment){
                return res.status(400).json({
                    success:false,
                    message:"comment is required",
                })
            }else if(!patientId){
                return res.status(400).json({
                    success:false,
                    message:"Patient Id is required"
                })
            }else if(!attended){
                return res.status(400).json({
                    success:false,
                    message:"attended is required"
                })
            }
            const newAppoinment = new NewAppoinmnet({comment,attended,date,patientId})
            await newAppoinment.save();
            res.status(200).json({
                success:true,
                message:"New Appoinmnet Added Successfully",
                data:newAppoinment
            })
        } catch (error) {
            res.status(500).json({
                success:false,
                message:"Internal server error",
                error:error.message, 
            })
        }
    },
    GetNewAppoinment : async(req,res)=>{
        try {
            const patientId = req.query.id
            if(!patientId){
                return res.status(400).json({
                    success:false,
                    message: "Patient Id is required" 
                }); 
            }
            const newAppoinment = await NewAppoinmnet.find({patientId:patientId});
            if(newAppoinment){
                return res.status(200).json({
                    success:true,
                    message:"New Appoinment Retrieved Successfully",
                    data:newAppoinment
                })
            }else{
                return res.status(404).json({
                    success:false,
                    message:"No New Appoinment Found",
                })
            }
        } catch (error) {
            res.status(500).json({
                success:false,
                message:"Internal Server Error",
                error:error.message
            })
        }
    },
    UpdateNewAppoinment : async(req,res)=>{
        try {
            const { id } = req.query;
            const {date,comment,attended,patientId}=req.body;
            if(!id){
                return res.status(400).json({
                    success:false,
                    message: "Id is required"
                })
            }else if(!date){
                return res.status(400).json({
                    success:false,
                    message:"date is required"
                })
            }else if(!comment){
                return res.status(400).json({
                    success:false,
                    message:"comment is required"
                })
            }else if(!patientId){
                return res.status(400).json({
                    success:false,
                    message:"PatientId is required"
                })
            }else if(!attended){
                return res.status(400).json({
                    success:false,
                    message:"attended is required"
                })
            }
            const updateNewAppoinmentdata = await NewAppoinmnet.findByIdAndUpdate(
                id,
                {date,comment,attended,patientId},
                {new:true,runValidators:true}
            );
            
            if (!updateNewAppoinmentdata) {
                return res.status(404).json({
                    success:false,
                    message: "New Appoinment not found"
                 });
            }
    
            return res.status(200).json({
                success: true,
                message: "New Appoinment updated successfully",
                data: updateNewAppoinmentdata,
            });
        } catch (error) {
            res.status(500).json({
                success:false,
                message:"Internal Server Error",
                error:error.message
            })
        }
    }
}