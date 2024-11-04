const Points = require("../../models/Points");


module.exports={
    AddPoints: async(req,res)=>{
        try {
            const { content, patientId,date} = req.body;
            
            if(!content){
                return res.status(400).json({
                    success:false,
                    message: "Points is required"
                });
            }else if(!patientId){
                return res.status(400).json({
                    success:false,
                    message:"Patient Id is require",
                });
            }
            const newData = await Points.create({content,patientId,date});
            return res.status(200).json({
                success:true,
                message: "Points Added Successfully",
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
    GetPoints: async(req,res)=>{
        try {
            const patientId = req.query.id
            if(!patientId){
                return res.status(400).json({
                    success:false,
                    message: "Patient Id is required" 
                }); 
            }
            const points = await Points.find({patientId:patientId}).sort({_id:-1});
            if(points){
                return res.status(200).json({
                    success:true,
                    message:"Points Retrieved Successfully",
                    data:points
                })
            }else{
                return res.status(404).json({
                    success:false,
                    message:"No Points Found",
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
    UpdatePoints: async(req,res)=>{
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
                    message:"Points is required"
                })
            }else if(!patientId){
                return res.status(400).json({
                    success:false,
                    message: "Patient Id is required"
                })
            }
            const updatePointsdata = await Points.findByIdAndUpdate(
                id,
                {content,patientId,date},
                {new:true,runValidators:true}
            );
            
            if (!updatePointsdata) {
                return res.status(404).json({
                    success:false,
                    message: "Points not found"
                 });
            }
    
            return res.status(200).json({
                success: true,
                message: "Points updated successfully",
                data: updatePointsdata,
            });

        } catch (error) {
            res.status(500).json({
                success:false,
                message:"Internal Server Error",
                error:error.message
            })
        }
    },
    DeletePoints: async (req, res) => {
        try {
            const { id } = req.query;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: "Points ID is required"
                });
            }

            const deletedComplaint = await Points.findByIdAndDelete(id);

            if (!deletedComplaint) {
                return res.status(404).json({
                    success: false,
                    message: "Points not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Points deleted successfully",
            });

        } catch (error) {
            console.error("Error deleting Points:", error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
        }
    },
}