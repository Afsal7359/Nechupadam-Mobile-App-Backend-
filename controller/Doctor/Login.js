const DoctorLog = require("../../models/DoctorAuth");
const jwt = require('jsonwebtoken')

module.exports={
    DoctorLogin : async(req,res)=>{
        try {
            const UserInfo = req.body;
            const User = await DoctorLog.find({username:UserInfo.username});
            console.log(User,"uuuuu");
            
            if (!User|| User.length === 0) {
                res.json({
                    success: false,
                    message: "user Not Found !! "
                })
            } else {
                let validaPassword
                if(UserInfo.password===User[0].password){
                    validaPassword=true
                }else{
                    validaPassword=false
                }

                if (!validaPassword) {
                    res.json({
                        success: false,
                        message: "Invalid Password !!"
                    })
                } else {
                    const tokens = jwt.sign({ userId: User[0]._id }, process.env.JWT_SECRET);
                    console.log(tokens,"tocken");
                    res.json({
                        success: true,
                        message: "logged in successfully",
                        data:tokens,
                    })
                }
            }
            console.log(User,"user");
        } catch (error) {
            res.status(500).json({
                success:false,
                message: "Internal Server Error",
                error: error.message,
            })
        }
    },
    
}