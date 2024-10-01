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
    GetBooking: async(req,res)=>{
        try {
            const id = req.userId
            console.log(id,"id");
            const Data = await Booking.find({patientId:id}).sort({_id:-1}).limit(5).populate('patientId');
            return res.status(200).json({
                success:true,
                message:"Booking Details",
                data:Data
            })
        } catch (error) {
            re.status(500).json({
                success:false,
                message:"Internal Server Error",
            })
        }
    },
    PaginatedGetBooking: async(req,res)=>{
        try {
            
             const page = parseInt(req.query.page) || 1;
             const limit = 15

            const skip = (page - 1) * limit;

            const total = await Booking.countDocuments();

             // Fetch bookings with pagination
                const bookings = await Booking.find()
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 }); // Sort by creation date, newest first

                // Calculate total pages
                const totalPages = Math.ceil(total / limit);

                return res.status(200).json({
                success: true,
                data: bookings,
                currentPage: page,
                totalPages: totalPages,
                total: total,
                });
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:"Internal Server Error",
            })
        }
    }
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