const Diagnosis = require("../../models/Diagnosis");


module.exports={
    AddDiagnosis: async(req,res)=>{
        try {
            const { content, patientId,date} = req.body;
            
            if(!content){
                return res.status(400).json({
                    success:false,
                    message: "Diagnosis is required"
                });
            }else if(!patientId){
                return res.status(400).json({
                    success:false,
                    message:"Patient Id is require",
                });
            }
            const newData = await Diagnosis.create({content,patientId,date});
            return res.status(200).json({
                success:true,
                message: "Diagnosis Added Successfully",
                data: newData
            })
        } catch (error) {
            console.log(error,"eeeee");
            
            res.status(500).json({
                success:false,
                message:"Internal Server Error",
                error:error.message,
            })
        }
    },
    GetDiagnosis: async(req,res)=>{
        try {
            const patientId = req.query.id
            if(!patientId){
                return res.status(400).json({
                    success:false,
                    message: "Patient Id is required" 
                }); 
            }
            const diagnosis = await Diagnosis.find({patientId:patientId}).sort({_id:-1});
            if(diagnosis){
                return res.status(200).json({
                    success:true,
                    message:"Diagnosis Retrieved Successfully",
                    data:diagnosis
                })
            }else{
                return res.status(404).json({
                    success:false,
                    message:"No TreatmentDetails Found",
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
    UpdateDiagnosis: async(req,res)=>{
        try {
            const {content,patientId,date} = req.body;
            const {id} = req.query;
            if(!id){
                return res.status(400).json({
                    success:false,
                    message:"Id is required"
                })
            }else if(!content){
                return res.status(400).json({
                    success:false,
                    message:"Diagnosis is required"
                })
            }else if(!patientId){
                return res.status(400).json({
                    success:false,
                    message: "Patient Id is required"
                })
            }
            const updateDiagnosisdata = await Diagnosis.findByIdAndUpdate(
                id,
                {content,patientId,date},
                {new:true,runValidators:true}
            );
            
            if (!updateDiagnosisdata) {
                return res.status(404).json({
                    success:false,
                    message: "diagnosis not found"
                 });
            }
    
            return res.status(200).json({
                success: true,
                message: "diagnosis updated successfully",
                data: updateDiagnosisdata,
            });

        } catch (error) {
            res.status(500).json({
                success:false,
                message:"Internal Server Error",
                error:error.message
            })
        }
    },
    DeleteDiagnosis: async (req, res) => {
        try {
            const { id } = req.query;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: "Diagnosis ID is required"
                });
            }

            const deletedComplaint = await Diagnosis.findByIdAndDelete(id);

            if (!deletedComplaint) {
                return res.status(404).json({
                    success: false,
                    message: "Diagnosis not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Diagnosis deleted successfully",
            });

        } catch (error) {
            console.error("Error deleting Diagnosis:", error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
        }
    },
}