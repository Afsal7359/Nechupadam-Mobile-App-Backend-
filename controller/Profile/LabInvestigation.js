const LabInvestigation = require("../../models/LabInvestigation");
const  cloudinary = require("../../utils/cloudinary");

module.exports={
    AddLabInvestigation: async(req,res)=>{
        try {
            const { patientId, name } = req.body;
            
            // Input validation
            if (!patientId) {
                return res.status(400).json({
                    success: false,
                    message: "Patient ID is required"
                });
            }
            
            if (!name) {
                return res.status(400).json({
                    success: false,
                    message: "Name is required"
                });
            }
            
            // Check if file exists in request
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "Image is required"
                });
            }
    
            // Upload image to cloudinary
            const imageResult = await cloudinary.uploader.upload(req.file.path);
    console.log(imageResult,"imgres");
    
            // Create new lab investigation record
            const NewData = await LabInvestigation.create({
                name,
                image: imageResult.secure_url,
                patientId
            });
    
            return res.status(200).json({
                success: true,
                message: "Lab Investigation Added Successfully",
                data: NewData,
            });
    
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
        }
    },
    GetLabInvestigation: async(req,res)=>{
        try {
            const patientId = req.query.id
            if(!patientId){
                return res.status(400).json({
                    success:false,
                    message: "Patient Id is required" 
                }); 
            }

            const labInvestigation = await LabInvestigation.find({patientId:patientId}).sort({_id:-1});
            if(LabInvestigation){
                return res.status(200).json({
                    success:true,
                    message:"lab Investigation  Retrieved Successfully",
                    data:labInvestigation
                })
            }else{
                return res.status(404).json({
                    success:false,
                    message:"No lab Investigation Found",
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
    UpdateLabInvestigation: async(req,res)=>{
        try {
            const { id } = req.query;
            const {name,patientId}=req.body;
            const {image} = req.files;
            if(!id){
                return res.status(400).json({
                    success:false,
                    message: "Id is required"
                })
            }else if(!name){
                return res.status(400).json({
                    success:false,
                    message:"name is required"
                })
            }else if(!image){
                return res.status(400).json({
                    success:false,
                    message:"image is required"
                })
            }else if(!patientId){
                return res.status(400).json({
                    success:false,
                    message:"PatientId is required"
                })
            }
                        const imageResult = image ? await cloudinary.uploader.upload(image[0].path, { folder: 'DentalClinic' }) : null;

            const updateLabInvestigationdata = await LabInvestigation.findByIdAndUpdate(
                id,
                {name,image:imageResult?imageResult.secure_url:null,patientId},
                {new:true,runValidators:true}
            );
            
            if (!updateLabInvestigationdata) {
                return res.status(404).json({
                    success:false,
                    message: "Lab Investigation not found"
                 });
            }
    
            return res.status(200).json({
                success: true,
                message: "Lab Investigation updated successfully",
                data: updateLabInvestigationdata,
            });
        } catch (error) {
            res.status(500).json({
                success:false,
                message:"Internal Server Error",
                error:error.message
            })
        }
    },
    DeleteLabInvestigation: async (req, res) => {
        try {
            const { id } = req.query;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: "Lab Investigation ID is required"
                });
            }

            const deletedComplaint = await LabInvestigation.findByIdAndDelete(id);

            if (!deletedComplaint) {
                return res.status(404).json({
                    success: false,
                    message: "Lab Investigation not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Lab Investigation deleted successfully",
            });

        } catch (error) {
            console.error("Error deleting Lab Investigation:", error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
        }
    },
}