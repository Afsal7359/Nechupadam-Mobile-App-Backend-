const DentalHistory = require('../../models/DentalHistory');

module.exports={
    AddDentalHistory : async(req,res)=>{
        try {
            const {date,content, patientId}=req.body;

            if(!date){
                return res.status(400).json({
                    success:false,
                    message:"Date is required"
                })
            }else if(!content){
                return res.status(400).json({
                    success:false,
                    message:"Dental  History is required",
                })
            }else if(!patientId){
                return res.status(400).json({
                    success:false,
                    message:"Patient Id is required"
                })
            }
            const dentalHistory = new DentalHistory({content,date,patientId})
            await dentalHistory.save();
            res.status(200).json({
                success:true,
                message:"Dental History Added Successfully",
                data:dentalHistory
            })
        } catch (error) {
            res.status(500).json({
                success:false,
                message:"Internal server error",
                error:error.message, 
            })
        }
    },
    GetDentalHistory : async(req,res)=>{
        try {
            const patientId = req.query.id
            if(!patientId){
                return res.status(400).json({
                    success:false,
                    message: "Patient Id is required" 
                }); 
            }
            const dentalHistory = await DentalHistory.find({patientId:patientId}).sort({_id:-1});
            if(dentalHistory){
                return res.status(200).json({
                    success:true,
                    message:"Dental History Retrieved Successfully",
                    data:dentalHistory
                })
            }else{
                return res.status(404).json({
                    success:false,
                    message:"No Dental History Found",
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
    UpdateDentalHistory : async(req,res)=>{
        try {
            const { id } = req.query;
            const {date,content,patientId}=req.body;
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
            }else if(!content){
                return res.status(400).json({
                    success:false,
                    message:"content is required"
                })
            }else if(!patientId){
                return res.status(400).json({
                    success:false,
                    message:"PatientId is required"
                })
            }
            const updatedentalhisorydata = await DentalHistory.findByIdAndUpdate(
                id,
                {date,content,patientId},
                {new:true,runValidators:true}
            );
            
            if (!updatedentalhisorydata) {
                return res.status(404).json({
                    success:false,
                    message: "Dental History not found"
                 });
            }
    
            return res.status(200).json({
                success: true,
                message: "Dental History updated successfully",
                data: updatedentalhisorydata,
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