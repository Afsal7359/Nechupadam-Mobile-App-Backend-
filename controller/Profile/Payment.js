const Payment = require("../../models/Payments");

module.exports={

        AddFees: async(req,res)=>{
            try {
                const {patientId,date,amount,name,paymentMethod,type} = req.body;
                if(!patientId){
                    res.status(404).json({
                        success:false,
                        message: "Patient ID is required"
                    })
                }else if(!amount){
                    res.status(404).json({
                        success:false,
                        message: "amount is required"
                    })
                }
                const newData = await Payment.create({amount,patientId,date,name,paymentMethod,type});
                return res.status(200).json({
                    success:true,
                    message: "Points Added Successfully",
                    data: newData
                })

            } catch (error) {
                res.status(500).json({
                    error:error,
                    success:false,
                    message:"server error"
                })
            }
        },
        
        // Edit Payment
        EditFees: async (req, res) => {
            try {
                const { id } = req.query;
                const { patientId, date, amount, name, paymentMethod, type } = req.body;

                // Check if payment exists
                const payment = await Payment.findById(id);
                if (!payment) {
                    return res.status(404).json({
                        success: false,
                        message: "Payment not found"
                    });
                }

                // Update payment
                const updatedPayment = await Payment.findByIdAndUpdate(
                    id,
                    {
                        patientId,
                        date,
                        amount,
                        name,
                        paymentMethod,
                        type
                    },
                    { new: true } // Return updated document
                );

                return res.status(200).json({
                    success: true,
                    message: "Payment Updated Successfully",
                    data: updatedPayment
                });
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    message: "Server error",
                    error: error.message
                });
            }
        },

        // Delete Payment
        DeleteFees: async (req, res) => {
            try {
                const { id } = req.query;

                // Check if payment exists
                const payment = await Payment.findById(id);
                if (!payment) {
                    return res.status(404).json({
                        success: false,
                        message: "Payment not found"
                    });
                }

                // Delete payment
                await Payment.findByIdAndDelete(id);

                return res.status(200).json({
                    success: true,
                    message: "Payment Deleted Successfully"
                });
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    message: "Server error",
                    error: error.message
                });
            }
        },

        // Get All Payments
        GetAllFees: async (req, res) => {
            try {
                const payments = await Payment.find().sort({ date: -1 });

                return res.status(200).json({
                    success: true,
                    message: "Payments Retrieved Successfully",
                    data: payments
                });
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    message: "Server error",
                    error: error.message
                });
            }
        },

        // Get Payment by ID
        GetFeeById: async (req, res) => {
            try {
                const { id } = req.params;

                const payment = await Payment.findById(id);
                if (!payment) {
                    return res.status(404).json({
                        success: false,
                        message: "Payment not found"
                    });
                }

                return res.status(200).json({
                    success: true,
                    message: "Payment Retrieved Successfully",
                    data: payment
                });
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    message: "Server error",
                    error: error.message
                });
            }
        },

        // Get Payments by Patient ID
        GetFeesByPatientId: async (req, res) => {
            try {
                const { patientId } = req.params;

                const payments = await Payment.find({ patientId }).sort({ date: -1 });

                return res.status(200).json({
                    success: true,
                    message: "Payments Retrieved Successfully",
                    data: payments
                });
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    message: "Server error",
                    error: error.message
                });
            }
        }
}