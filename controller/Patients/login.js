const User = require("../../models/UserModel");
const bcrypt  = require('bcryptjs');
const jwt = require('jsonwebtoken')
var request = require('request');

module.exports={

    PatientLogin: async (req, res) => {
        try {
            let userInfo = req.body;
            console.log(userInfo, "req.body");
          
            // Find the user by phone
            const user = await User.findOne({ phone: userInfo.phone });
    
            if (user) {
                // Compare provided password with the hashed password
                const validPassword = await bcrypt.compare(userInfo.password, user.password);
    
                if (!validPassword) {
                    // If the password is invalid, return an error response
                    return res.json({
                        success: false,
                        message: "Invalid Password !!"
                    });
                } 
    
                // Generate JWT token if the password is correct
                const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
                console.log(token, "token");
    
                // Send success response with the token
                return res.json({
                    success: true,
                    message: "Logged in successfully",
                    token: token,
                    user:user
                });
    
            } else {
                // If user is not found, return an error response
                return res.json({
                    success: false,
                    message: "User not found !! Please check your phone number once more."
                });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Error in Login",
                error: error.message,
            });
        }
    },
    PatientRegister: async (req, res) => {
        try {
            let userInfo = req.body;
            console.log(userInfo,"user");
            if(!userInfo.name){
                return res.status(400).json({
                    success: false,
                    message: "Name is required"
                })
            }else if(!userInfo.phone){
                return res.status(400).json({
                    success: false,
                    message:"Phone Number is required"
                })
            }
            
            // Check if the user is already registered
            const existingUser = await User.findOne({ phone: userInfo.phone });
            
            if (existingUser) {
                // If user exists, send a response indicating registration already exists
                return res.status(400).json({
                    success:false,
                    message: "User already registered with this phone number."
                });
            }
          
    
            // If user is not found, create a new user (implement user creation logic here)
            const newUser = new User({
                name: userInfo.name,
                phone: userInfo.phone,
                email:userInfo.email,
            });
    
            // Save the new user
            await newUser.save();

            const user = await User.findOne({ phone: userInfo.phone});
            const tokens = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "2d" });
            console.log(tokens,"tocken");
            // Send a success response
            return res.status(201).json({
                success:true,
                message: "User registered successfully",
                token:tokens,
                user: user
            });
    
        } catch (error) {
            console.log(error);
            // Send error response
            return res.status(500).json({
                success:false,
                message: "Internal server error"
            });
        }
    },
    SendOtpToPatient: async(req,res)=>{
        try {
            const { phone } = req.body;
            console.log(phone);
            
            if(!phone){
                return res.status(400).json({
                    success:false,
                    message: "Phone number is required"
                })
            }
            const existingUser = await User.find({phone:phone});

            if(existingUser.length ===0){
                return res.status(400).json({
                    success:false,
                    message: "User not found! Please register if you don't have an account",
                })
            }

            var options = {
            'method': 'POST',
            'url': `https://cpaas.messagecentral.com/verification/v3/send?countryCode=91&customerId=C-35C587C4A93E482&flowType=SMS&mobileNumber=${phone}`,
            'headers': {
            'authToken': "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDLTM1QzU4N0M0QTkzRTQ4MiIsImlhdCI6MTcyNjc0MTA4MSwiZXhwIjoxODg0NDIxMDgxfQ.tdOkqvsVGhRP_BRq7zGW5vCLdMvLeXX_mFArIrOt__QTiSI65EAUAF2fSxEv_do7sc1t2YIuhFl2iwWZPHHiuw"
            }
            };
            request(options, function (error, Response) {
                const response = JSON.parse(Response.body);
                console.log(response,"res");
                
                if(response.responseCode === 200){
                    return res.status(200).json({
                        success:true,
                        message: "Otp sent successfully",
                        verificationId:response.data.verificationId
                    })
                }else if(response.responseCode === 506){
                    return res.status(200).json({
                        success:true,
                        message: "Otp sent successfully",
                        verificationId:response.data.verificationId
                    })
                }else{
                    return res.status(400).json({
                        success:false,
                        message: "Failed to send otp"
                    })
                }
            });
              } 
              catch (error) {
            console.log(error);
            
        }
    },
    ValidatePatientsOTP: async(req,res)=>{
        try {
            const {otp,phone,verificationId}= req.body;
            if(!otp){
                return res.status(400).json({
                    success:false,
                    message: "OTP is required"
                })
            }
            const UserData = await User.find({phone:phone})
        var options = {
        'method': 'GET',
        'url': `https://cpaas.messagecentral.com/verification/v3/validateOtp?countryCode=91&mobileNumber=${phone}&verificationId=${verificationId}&customerId=C-35C587C4A93E482&code=${otp}`,
        'headers': {
        'authToken': "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDLTM1QzU4N0M0QTkzRTQ4MiIsImlhdCI6MTcyNjc0MTA4MSwiZXhwIjoxODg0NDIxMDgxfQ.tdOkqvsVGhRP_BRq7zGW5vCLdMvLeXX_mFArIrOt__QTiSI65EAUAF2fSxEv_do7sc1t2YIuhFl2iwWZPHHiuw"
        }
        };
        request(options, function (error, Response) {

            const response = JSON.parse(Response.body);
            console.log(response);
            const token = jwt.sign({ userId: UserData[0]._id }, process.env.JWT_SECRET);
           if(response.responseCode === 200){
            return res.status(200).json({
                success:true,
                message: "OTP Verified SuccessFully",
                token:token,
                data:UserData,
            })
           }else if(response.responseCode === 703){
            return res.status(200).json({
                success:true,
                message: "OTP Verified SuccessFully",
                token:token,
                data:UserData,
            })
           }else{
            return res.json({
                success:false,
                message: response.message,
            })
           }
        });
        } catch (error) {
            res.status(500).json({
                success:false,
                message:"Server error"
            })
        }
    }
}