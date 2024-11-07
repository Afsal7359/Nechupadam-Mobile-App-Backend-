const User = require("../../models/UserModel");

module.exports={
    AddPatientsfromDoctor:async(req,res)=>{
        try {
            const {name,age,dob,address,sex,phone,doctor,date,patientNo}=req.body;
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
            }else if(!date){
                return res.status(400).json({success:false,message:"date is required"})
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
                name,age,dob,address,sex,phone,doctor,patientNo,date
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
    },
    GetPatientsPaginatedData: async(req,res)=>{
        try {
            const page = parseInt(req.query.page) || 1
            const limit = 10;

            const skip = (page -1) * limit;
            const total = await User.countDocuments();

            const Patients = await User.find({isdeleted: { $ne: true }})
            .skip(skip).
            limit(limit).
            sort({_id: -1});
            const totalPages = Math.ceil(total/limit);

            return res.status(200).json({
                success:true,
                message:"Patients Data",
                data: Patients,
                currentPage: page,
                totalPages: totalPages,
                total: total,
            })

        } catch (error) {
            return res.status(500).json({
                success:false,
                message:"Internal Server Error",
            })
        }
    },
    GetAllPatients: async(req,res)=>{
        try {
            const Data = await User.find({ isdeleted: { $ne: true }}).sort({_id:-1})
            return res.status(200).json({
                success:true,
                message:"Patient Data Retrieved",
                data: Data
            })
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:"Internal Server Error",
            })
        }
    },
    EditPatient: async (req, res) => {
        try {
            const { id } = req.query;
            const { name, age, dob, address, sex, phone, doctor, date, patientNo } = req.body;
    
            // Check if the patient exists
            const patient = await User.findById(id);
            if (!patient) {
                return res.status(404).json({ success: false, message: "Patient not found" });
            }
    
            // Update the patient's information
            patient.name = name || patient.name;
            patient.age = age || patient.age;
            patient.dob = dob || patient.dob;
            patient.address = address || patient.address;
            patient.sex = sex || patient.sex;
            patient.phone = phone || patient.phone;
            patient.doctor = doctor || patient.doctor;
            patient.patientNo = patientNo || patient.patientNo;
            patient.date = date || patient.date;
    
            await patient.save();
            return res.status(200).json({
                success: true,
                message: "Patient updated successfully",
                data: patient
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
        }
    },
    
    DeletePatient: async (req, res) => {
        try {
            const { id } = req.query;
    
            // Check if the patient exists
            await User.updateOne({ _id: id }, { $set: { isdeleted: true } });
            return res.status(200).json({
                success: true,
                message: "Patient deleted successfully"
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
        }
    }
}