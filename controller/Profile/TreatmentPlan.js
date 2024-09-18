const TreatmentPlan = require("../../models/TreatmentPlan");


module.exports={
    AddTreatmentPlan : async(req,res)=>{
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
                    message:"TreatmentPlan is required",
                })
            }else if(!patientId){
                return res.status(400).json({
                    success:false,
                    message:"Patient Id is required"
                })
            }
            const treatmentPlan = new TreatmentPlan({content,date,patientId})
            await treatmentPlan.save();
            res.status(200).json({
                success:true,
                message:"TreatmentPlan Added Successfully",
                data:treatmentPlan
            })
        } catch (error) {
            res.status(500).json({
                success:false,
                message:"Internal server error",
                error:error.message, 
            })
        }
    },
    GetTreatmentPlan : async(req,res)=>{
        try {
            const patientId = req.query.id
            if(!patientId){
                return res.status(400).json({
                    success:false,
                    message: "Patient Id is required" 
                }); 
            }
            const treatmentPlan = await TreatmentPlan.find({patientId:patientId});
            if(treatmentPlan){
                return res.status(200).json({
                    success:true,
                    message:"TreatmentPlan Retrieved Successfully",
                    data:treatmentPlan
                })
            }else{
                return res.status(404).json({
                    success:false,
                    message:"No TreatmentPlan Found",
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
    UpdateTreatmentPlan : async(req,res)=>{
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
            const updatedentalhisorydata = await TreatmentPlan.findByIdAndUpdate(
                id,
                {date,content,patientId},
                {new:true,runValidators:true}
            );
            
            if (!updatedentalhisorydata) {
                return res.status(404).json({
                    success:false,
                    message: "TreatmentPlan not found"
                 });
            }
    
            return res.status(200).json({
                success: true,
                message: "TreatmentPlan updated successfully",
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