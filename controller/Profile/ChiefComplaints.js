const CheifComplaint = require("../../models/ChiefComplaints")

module.exports={
    AddChiefComplaints: async (req, res) => {
        try {
            const { content, date, patientId } = req.body; 
    
            if (!content ) {
                return res.status(400).json({
                     success:false,
                     message: "cheif complaint field is required"
                     });
            }else if(!date){
                return res.status(400).json({
                    success:false,
                    message: "date field is required"
                })
            }else if(!patientId){
                return res.status(400).json({
                    success:false,
                    message: "patientId field is required"
                })
            }

           const NewData = await CheifComplaint.create({ content, date, patientId });
            return res.status(200).json({
                success: true,
                message: "Chief Complaints Added Successfully",
                data: NewData,

            });
    
        } catch (error) {
            console.error("Error adding Chief Complaints:", error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error:error.message
            });
        }
    },
    
    GetChiefComplaints: async(req,res)=>{
        try {
            console.log(req.query,"params");
            
            const patientId = req.query.id
            if (!patientId) {
                return res.status(400).json({
                    success:false,
                    message: "Patient Id is required" 
                });
            }
            const chiefComplaints = await CheifComplaint.find({patientId:patientId}).sort({_id:-1})
            console.log(chiefComplaints,"cccccc");
            if(chiefComplaints){
                return res.status(200).json({
                    success:true,
                    message:"Chief Complaints Retrieved Successfully",
                    data:chiefComplaints
                })
            }else{
                return res.status(404).json({
                    success:false,
                    message:"No Chief Complaints Found",
                })
            }
            
        } catch (error) {
            console.log(error);
            
            res.status(500).json({
                success:false,
                message:"Internal Server Error",
                error:error.message
            })
        }
    },
    UpdateChiefComplaints: async (req, res) => {
        try {
            const { id } = req.query;
            const { content, date, patientId } = req.body;
    
            if (!content ) {
                return res.status(400).json({
                     success:false,
                     message: "cheif complaint field is required"
                     });
            }else if(!date){
                return res.status(400).json({
                    success:false,
                    message: "date field is required"
                })
            }else if(!patientId){
                return res.status(400).json({
                    success:false,
                    message: "patientId field is required"
                })
            }
    
            // Find the chief complaint by ID and update it
            const updatedChiefComplaint = await CheifComplaint.findByIdAndUpdate(
                id, 
                { content, date, patientId }, // Fields to be updated
                { new: true, runValidators: true } 
            );
    
            if (!updatedChiefComplaint) {
                return res.status(404).json({
                    success:false,
                    message: "Chief Complaint not found" 
                });
            }
    
            return res.status(200).json({
                success: true,
                message: "Chief Complaint updated successfully",
                data: updatedChiefComplaint,
            });
    
        } catch (error) {
            console.error("Error updating Chief Complaint:", error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error:error.message
            });
        }
    },
    DeleteChiefComplaint: async (req, res) => {
        try {
            const { id } = req.query;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: "Chief Complaint ID is required"
                });
            }

            const deletedComplaint = await CheifComplaint.findByIdAndDelete(id);

            if (!deletedComplaint) {
                return res.status(404).json({
                    success: false,
                    message: "Chief Complaint not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Chief Complaint deleted successfully",
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