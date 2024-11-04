const Medicine = require("../../models/Medicine");

module.exports={
    AddMedicine: async(req,res)=>{
        try {
            const { content, patientId,date} = req.body;
            
            if(!content){
                return res.status(400).json({
                    success:false,
                    message: "Medicine is required"
                });
            }else if(!patientId){
                return res.status(400).json({
                    success:false,
                    message:"Patient Id is require",
                });
            }
            const newData = await Medicine.create({content,patientId,date});
            return res.status(200).json({
                success:true,
                message: "Medicine Added Successfully",
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
    GetMedicine: async(req,res)=>{
        try {
            const patientId = req.query.id
            if(!patientId){
                return res.status(400).json({
                    success:false,
                    message: "Patient Id is required" 
                }); 
            }
            const medicine = await Medicine.find({patientId:patientId}).sort({_id:-1});
            if(medicine){
                return res.status(200).json({
                    success:true,
                    message:"Medicine Retrieved Successfully",
                    data:medicine
                })
            }else{
                return res.status(404).json({
                    success:false,
                    message:"No Medicine Found",
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
    UpdateMedicine: async(req,res)=>{
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
                    message:"Medicine is required"
                })
            }else if(!patientId){
                return res.status(400).json({
                    success:false,
                    message: "Patient Id is required"
                })
            }
            const updateMedicinedata = await Medicine.findByIdAndUpdate(
                id,
                {content,patientId,date},
                {new:true,runValidators:true}
            );
            
            if (!updateMedicinedata) {
                return res.status(404).json({
                    success:false,
                    message: "Medicine not found"
                 });
            }
    
            return res.status(200).json({
                success: true,
                message: "Medicine updated successfully",
                data: updateMedicinedata,
            });

        } catch (error) {
            res.status(500).json({
                success:false,
                message:"Internal Server Error",
                error:error.message
            })
        }
    },
    DeleteMedicine: async (req, res) => {
        try {
            const { id } = req.query;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: "Medicine ID is required"
                });
            }

            const deletedComplaint = await Medicine.findByIdAndDelete(id);

            if (!deletedComplaint) {
                return res.status(404).json({
                    success: false,
                    message: "Medicine not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Medicine deleted successfully",
            });

        } catch (error) {
            console.error("Error deleting Medicine:", error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
        }
    },
}