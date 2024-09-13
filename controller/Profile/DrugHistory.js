const DrugHistory = require('../../models/DrugHistory');

module.exports={
    AddDrugHistory : async(req,res)=>{
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
                    message:"Drug  History is required",
                })
            }else if(!patientId){
                return res.status(400).json({
                    success:false,
                    message:"Patient Id is required"
                })
            }
            const drughistory = new DrugHistory({content,date,patientId})
            await drughistory.save();
            res.status(200).json({
                success:true,
                message:"Drug History Added Successfully",
                data:drughistory
            })
        } catch (error) {
            res.status(500).json({
                success:false,
                message:"Internal server error",
                error:error.message, 
            })
        }
    },
    GetDrugHistory : async(req,res)=>{
        try {
            const patientId = req.query.id
            if(!patientId){
                return res.status(400).json({
                    success:false,
                    message: "Patient Id is required" 
                }); 
            }
            const drughistory = await DrugHistory.find({patientId:patientId});
            if(drughistory){
                return res.status(200).json({
                    success:true,
                    message:"Drug History Retrieved Successfully",
                    data:drughistory
                })
            }else{
                return res.status(404).json({
                    success:false,
                    message:"No Drug History Found",
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
    UpdateDrugHistory : async(req,res)=>{
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
            const updateDrughisorydata = await DrugHistory.findByIdAndUpdate(
                id,
                {date,content,patientId},
                {new:true,runValidators:true}
            );
            
            if (!updateDrughisorydata) {
                return res.status(404).json({
                    success:false,
                    message: "Drug History not found"
                 });
            }
    
            return res.status(200).json({
                success: true,
                message: "Drug History updated successfully",
                data: updateDrughisorydata,
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