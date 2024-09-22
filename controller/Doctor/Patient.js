const User = require("../../models/UserModel");

module.exports={
    AddPatientsfromDoctor:async(req,res)=>{
        try {
            const {name,age,dob,address,sex,phone,doctor,patientNo}=req.body;
            if(!name){
                return res.status(400).json({success:false,message:"Name is required"});
            }else if(!age){
                return res.status(400).json({success:false,message:"Age is required"});
            }else if(!dob){
                return res.status(400).json({success:false,message:"Date of Birth is required"});
            }else if(!address){
                return res.status(400).json({success:false,message:"Address is required"})
            }else if(!sex){
                return res.status(400).json({success:false,message:"Sex is required"})
            }else if(!phone){
                return res.status(400).json({success:false,message:"Phone is required"})
            }else if(!doctor){
                return res.status(400).json({success:false,message:"Doctor is required"})
            }else if(!patientNo){
                return res.status(400).json({success:false,message:"Patient No is required"})
            }
            const userExisting = await User.find({phone:phone});
            if(userExisting.length>0){
                console.log("rrrrrrrrrr");
                return res.status(400).json({
                    success:false,
                    message:"This mobile number is already used"
                })
            }
            const patient = new User({
                name,age,dob,address,sex,phone,doctor,patientNo
            })
            await patient.save();
            res.status(200).json({success:true,message:"Patient Added Successfully",data:patient})
        } catch (error) {
            res.status(500).json({
                success:false,
                message:"Internal Server Error",
                error:error.message
            })
        }
    }
}