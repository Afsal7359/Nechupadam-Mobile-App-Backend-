const DrugAllergy = require("../../models/DrugAllergy");

module.exports={
    AddDrugAllergy: async(req,res)=>{
        try {
            const { content, patientId,date} = req.body;
            
            if(!content){
                return res.status(400).json({
                    success:false,
                    message: "Drug Allergy is required"
                });
            }else if(!patientId){
                return res.status(400).json({
                    success:false,
                    message:"Patient Id is require",
                });
            }
            const newData = await DrugAllergy.create({content,patientId,date});
            return res.status(200).json({
                success:true,
                message: "Drug Allergy Added Successfully",
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
    GetDrugAllergy: async(req,res)=>{
        try {
            const patientId = req.query.id
            if(!patientId){
                return res.status(400).json({
                    success:false,
                    message: "Patient Id is required" 
                }); 
            }
            const drugallergy = await DrugAllergy.find({patientId:patientId}).sort({_id:-1});
            if(drugallergy){
                return res.status(200).json({
                    success:true,
                    message:"Drug Allergy Retrieved Successfully",
                    data:drugallergy
                })
            }else{
                return res.status(404).json({
                    success:false,
                    message:"No Drug Allergy Found",
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
    UpdateDrugAllergy: async(req,res)=>{
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
                    message:"Drug Allergy is required"
                })
            }else if(!patientId){
                return res.status(400).json({
                    success:false,
                    message: "Patient Id is required"
                })
            }
            const updatedrugAllergydata = await DrugAllergy.findByIdAndUpdate(
                id,
                {content,patientId,date},
                {new:true,runValidators:true}
            );
            
            if (!updatedrugAllergydata) {
                return res.status(404).json({
                    success:false,
                    message: "Drug Allergy not found"
                 });
            }
    
            return res.status(200).json({
                success: true,
                message: "Drug Allergy updated successfully",
                data: updatedrugAllergydata,
            });

        } catch (error) {
            res.status(500).json({
                success:false,
                message:"Internal Server Error",
                error:error.message
            })
        }
    },
    DeleteDrugAllergy: async (req, res) => {
        try {
            const { id } = req.query;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: "Drug Allergy ID is required"
                });
            }

            const deletedComplaint = await DrugAllergy.findByIdAndDelete(id);

            if (!deletedComplaint) {
                return res.status(404).json({
                    success: false,
                    message: "Drug Allergy not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Drug Allergy deleted successfully",
            });

        } catch (error) {
            console.error("Error deleting Chief Complaint:", error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
        }
    },
}