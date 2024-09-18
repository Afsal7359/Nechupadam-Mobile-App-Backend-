const ExaminationDetails = require("../../models/ExaminationDetails");

module.exports={
    AddExaminationDetails: async(req,res)=>{
        try {
            const {patientId,content,date}=req.body;
            if(!patientId){
                return res.status(400).json({
                    success:false,
                    message:"Patient ID is required"
                });
            }else if(!content){
                return res.status(400).json({
                    success:false,
                    message:"Examination Details is required"
                })
            }else if(!date){
                return res.status(400).json({
                    success:false,
                    message:"Date is required"
                })
            }
            const NewData = await ExaminationDetails.create({ content,date,patientId })
            return res.status(200).json({
                success: true,
                message: "ExaminationDetails Added Successfully",
                data: NewData,
            });
        } catch (error) {
            res.status(500).json({
                success:false,
                message: "Internal Server Error",
                error:error.message
            })
        }
    },
    GetExaminationDetails: async(req,res)=>{
        try {
            const patientId = req.query.id
            if(!patientId){
                return res.status(400).json({
                    success:false,
                    message: "Patient Id is required" 
                }); 
            }
            const examinationDetails = await ExaminationDetails.find({patientId:patientId});
            if(examinationDetails){
                return res.status(200).json({
                    success:true,
                    message:"Examination Details Retrieved Successfully",
                    data:examinationDetails
                })
            }else{
                return res.status(404).json({
                    success:false,
                    message:"No Examination Details Found",
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
    UpdateExaminationDetails: async(req,res)=>{
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
            const updateExaminationDetailsdata = await ExaminationDetails.findByIdAndUpdate(
                id,
                {date,content,patientId},
                {new:true,runValidators:true}
            );
            
            if (!updateExaminationDetailsdata) {
                return res.status(404).json({
                    success:false,
                    message: "Examination Details not found"
                 });
            }
    
            return res.status(200).json({
                success: true,
                message: "Examination Details updated successfully",
                data: updateExaminationDetailsdata,
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