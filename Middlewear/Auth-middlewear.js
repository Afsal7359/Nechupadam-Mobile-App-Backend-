const jwt = require('jsonwebtoken');


const userAuthMid = (req,res,next)=>{
    console.log(req.headers);
    let token =''
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }
    if(!token){
        res.status(403).json({
            success:false,
            message:"User Not Found !!"
        })
    }
    try {
        const {userId} = jwt.verify(token, process.env.JWT_SECRET)
        if(!userId){
            res.status(403).json({
                success:false,
                message:"Invalid Token Please Login !!"
            })
        }
        req.userId = userId;
        next();
    } catch (error) {
        res.status(403).json({
            success:false,
            message:"Invalid Token Please Login !!"
        })
    }
    
}
module.exports=userAuthMid;