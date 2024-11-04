
const TreatmentDeatils = require("../../models/TreatmentDetails");

module.exports={
    AddTreatmentDetails: async(req,res)=>{
        try {
            const { content, patientId,date} = req.body;
            
            if(!content){
                return res.status(400).json({
                    success:false,
                    message: "TreatmentDetails is required"
                });
            }else if(!patientId){
                return res.status(400).json({
                    success:false,
                    message:"Patient Id is  require",
                });
            }
            const newData = await TreatmentDeatils.create({content,patientId,date});
            return res.status(200).json({
                success:true,
                message: "TreatmentDetails Added Successfully",
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
    GetTreatmentDetails: async(req,res)=>{
        try {
            const patientId = req.query.id
            if(!patientId){
                return res.status(400).json({
                    success:false,
                    message: "Patient Id is required" 
                }); 
            }
            const treatmentDetails = await TreatmentDeatils.find({patientId:patientId}).sort({_id:-1});
            if(treatmentDetails){
                return res.status(200).json({
                    success:true,
                    message:"TreatmentDetails Retrieved Successfully",
                    data:treatmentDetails
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
    UpdateTreatmentDetails: async(req,res)=>{
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
                    message:"TreatmentDetails is required"
                })
            }else if(!patientId){
                return res.status(400).json({
                    success:false,
                    message: "Patient Id is required"
                })
            }
            const updateTreatmentDetailsdata = await TreatmentDeatils.findByIdAndUpdate(
                id,
                {content,patientId,date},
                {new:true,runValidators:true}
            );
            
            if (!updateTreatmentDetailsdata) {
                return res.status(404).json({
                    success:false,
                    message: "TreatmentDetails not found"
                 });
            }
    
            return res.status(200).json({
                success: true,
                message: "TreatmentDetails updated successfully",
                data: updateTreatmentDetailsdata,
            });

        } catch (error) {
            res.status(500).json({
                success:false,
                message:"Internal Server Error",
                error:error.message
            })
        }
    },
    DeleteTreatmentDetails: async (req, res) => {
        try {
            const { id } = req.query;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: "Treatment Details ID is required"
                });
            }

            const deletedComplaint = await TreatmentDeatils.findByIdAndDelete(id);

            if (!deletedComplaint) {
                return res.status(404).json({
                    success: false,
                    message: "Treatment Details not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Treatment Details deleted successfully",
            });

        } catch (error) {
            console.error("Error deleting Treatment Details:", error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
        }
    },
}