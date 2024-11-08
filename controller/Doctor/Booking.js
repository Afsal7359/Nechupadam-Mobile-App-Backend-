const Booking = require("../../models/Booking");
const User = require("../../models/UserModel");

module.exports={
    AddBooking: async(req,res)=>{
        try {
            const {patientId,patientName,patientNumber,patientAddress,date,time,procedure,remarks}=req.body;

            if(!time){
                return res.status(400).json({
                    success:false,
                   message:"Time is required"
                })
            }else if(!date){
                return res.status(400).json({
                    success:false,
                    message:"Date is required"
                })
            }
            const Data = await Booking.create({patientId,patientName,patientAddress,patientNumber,date,time,procedure,remarks});
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
    // AddBookingFromDoctor: async(req,res)=>{
    //     try {
            
    //     } catch (error) {
    //         return res.status(200).json({

    //         })
    //     }
    // },
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
    GetAllBooking : async(req,res)=>{
        try {
            const Data = await Booking.find().sort({_id:-1}).populate('patientId');
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
             const limit = 10

            const skip = (page - 1) * limit;

            const total = await Booking.countDocuments();

             // Fetch bookings with pagination
                const bookings = await Booking.find()
                .skip(skip)
                .limit(limit)
                .populate('patientId')
                .sort({ _id: -1 }); // Sort by creation date, newest first

                // Calculate total pages
                const totalPages = Math.ceil(total / limit);

                return res.status(200).json({
                success: true,
                message:"Booking Data",
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
    },
    UpdateBooking: async (req, res) => {
        try {
            const { id } = req.query; 
            // Validate that bookingId is provided
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: "Booking ID is required",
                });
            }
    
            // Create an object to hold the fields to update
            const updateFields = {};
    
            // Check and add fields to updateFields only if they are present in the request body
            if (req.body.patientId) updateFields.patientId = req.body.patientId;
            if (req.body.patientName) updateFields.patientName = req.body.patientName;
            if (req.body.patientNumber) updateFields.patientNumber = req.body.patientNumber;
            if (req.body.patientAddress) updateFields.patientAddress = req.body.patientAddress;
            if (req.body.date) updateFields.date = req.body.date;
            if (req.body.time) updateFields.time = req.body.time;
            if (req.body.procedure) updateFields.procedure = req.body.procedure;
            if (req.body.remarks) updateFields.remarks = req.body.remarks;
    
            // Find the booking by ID and update with provided fields
            const updatedBooking = await Booking.findByIdAndUpdate(
                id,
                updateFields, // Only update the fields present in updateFields
                { new: true } // Return the updated document
            );
    
            // Check if the booking was found and updated
            if (!updatedBooking) {
                return res.status(404).json({
                    success: false,
                    message: "Booking not found",
                });
            }
    
            return res.status(200).json({
                success: true,
                message: "Booking updated successfully",
                data: updatedBooking,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message,
            });
        }
    },
    DeleteBooking: async(req,res)=>{
        try {
            const { id } = req.query;
    
            // Check if the patient exists
            const bookings = await Booking.findById(id);
            if (!bookings) {
                return res.status(404).json({ success: false, message: "booking not found" });
            }
    
            await bookings.remove();
            return res.status(200).json({
                success: true,
                message: "bookings deleted successfully"
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message,
            });
        }
    },
    GetBookingCountTotal: async(req,res)=>{         
        try {             
          // Get total booking count             
          const bookingCount = await Booking.countDocuments();
                       
          // Get total patient count             
          const patientCount = await User.countDocuments({ isdeleted: false });
                       
          // Get today's bookings count             
          const today = new Date();             
          console.log(today,"today");             
          const todays= new Date(today.getFullYear(), today.getMonth(), today.getDate())             
          const formattedDate = todays.toISOString().slice(0, 10);             
          const todaysBookings = await Booking.countDocuments({
            date: {
              $gte: formattedDate,
              $lt: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
            },
          });
                       
          const todaysPatients = await User.countDocuments({
            createdAt: {
              $gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
              $lt: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
            },
            isdeleted: false
          });
                       
          return res.status(200).json({
            success: true,
            data: {
              totalBookings: bookingCount,
              totalPatients: patientCount,
              todaysBookings: todaysBookings,
              todaysPatients: todaysPatients
            }
          });
                 
        } catch (error) {
          return res.status(500).json({
            success: false,
            message: "Internal Server Error",
          });
        }
      }
}