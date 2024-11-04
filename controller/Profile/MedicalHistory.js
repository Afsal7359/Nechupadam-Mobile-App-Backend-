const MedicalHistory = require('../../models/MedicalHistory')

module.exports={
    AddMedicalHistory: async(req,res)=>{
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
                    message:"Medical History is required"
                })
            }else if(!date){
                return res.status(400).json({
                    success:false,
                    message:"Date is required"
                })
            }
            const NewData = await MedicalHistory.create({ content,date,patientId })
            return res.status(200).json({
                success: true,
                message: "Medical History Added Successfully",
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
    GetMedicalHistory: async(req,res)=>{
        try {
            const patientId = req.query.id
            if(!patientId){
                return res.status(400).json({
                    success:false,
                    message: "Patient Id is required" 
                }); 
            }
            const medicalhistory = await MedicalHistory.find({patientId:patientId}).sort({_id:-1});
            if(medicalhistory){
                return res.status(200).json({
                    success:true,
                    message:"Medical History Retrieved Successfully",
                    data:medicalhistory
                })
            }else{
                return res.status(404).json({
                    success:false,
                    message:"No Medical History Found",
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
    UpdateMedicalHistory: async(req,res)=>{
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
            const updateMedicalhisorydata = await MedicalHistory.findByIdAndUpdate(
                id,
                {date,content,patientId},
                {new:true,runValidators:true}
            );
            
            if (!updateMedicalhisorydata) {
                return res.status(404).json({
                    success:false,
                    message: "Medical History not found"
                 });
            }
    
            return res.status(200).json({
                success: true,
                message: "Medical History updated successfully",
                data: updateMedicalhisorydata,
            });
        } catch (error) {
            res.status(500).json({
                success:false,
                message:"Internal Server Error",
                error:error.message
            })
        }
    },
    DeleteMedicalHistory: async (req, res) => {
        try {
            const { id } = req.query;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: "Medical History ID is required"
                });
            }

            const deletedComplaint = await MedicalHistory.findByIdAndDelete(id);

            if (!deletedComplaint) {
                return res.status(404).json({
                    success: false,
                    message: "Medical History not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Medical History deleted successfully",
            });

        } catch (error) {
            console.error("Error deleting Medical History:", error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
        }
    },
}