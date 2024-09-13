const User = require("../../models/UserModel");
const bcrypt  = require('bcryptjs');
const jwt = require('jsonwebtoken')

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
            // Check if the user is already registered
            const existingUser = await User.findOne({ phone: userInfo.phone });
            
            if (existingUser) {
                // If user exists, send a response indicating registration already exists
                return res.status(400).json({
                    success:false,
                    message: "User already registered with this phone number."
                });
            }
                // Hash the password before storing it
                const salt = await bcrypt.genSalt(10); // Generate salt (10 rounds is a good default)
                const hashedPassword = await bcrypt.hash(userInfo.password, salt);
    
            // If user is not found, create a new user (implement user creation logic here)
            const newUser = new User({
                name: userInfo.name,
                phone: userInfo.phone,
                email:userInfo.email,
                password:hashedPassword
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
    
}