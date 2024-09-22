const Booking = require("../../models/Booking");

module.exports={
    AddBooking: async(req,res)=>{
        try {
            const {patientId,date,time,procedure,remarks}=req.body;

            if(!patientId){
                return res.status(400).json({
                    success:false,
                    message:"Patient ID is required"
                })
            }else if(!date){
                return res.status(400).json({
                    success:false,
                    message:"Date is required"
                })
            }else if(!time){
                return res.status(400).json({
                    success:false,
                    message:"Time is required"
                })
            }
            const Data = await Booking.create({patientId,date,time,procedure,remarks});
            return res.status(200).json({
                success:true,
                message:"Booking Added Successfully",
                data:Data
            });
        } catch (error) {
            res.status(500).json({
                success:false,
                message:"Internal Server Error",
                error:error.message
            })
        }
    },
    
    // AddBookingfromDoctor: async(req,res)=>{
    //     try {
    //         const {patientId,date,time,procedure,remarks}=req.body;

    //         if(!patientId){
    //             return res.status(400).json({
    //                 success:false,
    //                 message:"Patient ID is required"
    //             })
    //         }else if(!date){
    //             return res.status(400).json({
    //                 success:false,
    //                 message:"Date is required"
    //             })
    //         }else if(!time){
    //             return res.status(400).json({
    //                 success:false,
    //                 message:"Time is required"
    //             })
    //         }
    //         const Data = await Booking.create({patientId,date,time,procedure,remarks});
    //         return res.status(200).json({
    //             success:true,
    //             message:"Booking Added Successfully",
    //             data:Data
    //         });
    //     } catch (error) {
    //         res.status(500).json({
    //             success:false,
    //             message:"Internal Server Error",
    //             error:error.message
    //         })
    //     }
    // }
}