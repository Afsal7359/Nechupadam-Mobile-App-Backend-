const express = require('express');
const userAuthMid = require('../Middlewear/Auth-middlewear');
const ChiefComplaints = require('../controller/Profile/ChiefComplaints');
const MedicalHistory = require('../controller/Profile/MedicalHistory');
const DentalHistory = require('../controller/Profile/DentalHistory');
const DrugAllergy = require('../controller/Profile/DrugAllergy');
const DrugHistory = require('../controller/Profile/DrugHistory');
const Diagnosis = require('../controller/Profile/Diagnosis');
const TreatmentPlan = require('../controller/Profile/TreatmentPlan');
const TreatmentDetails = require('../controller/Profile/TreatmentDetails');
const Medicine = require('../controller/Profile/Medicine');
const ExaminationDetails = require('../controller/Profile/ExaminationDetails');
const LabInvestigation = require('../controller/Profile/LabInvestigation');
const upload = require('../utils/Multer');
const NewAppoinment = require('../controller/Profile/NewAppoinment');
const Points = require('../controller/Profile/Points');
const Booking = require('../controller/Doctor/Booking');
const Patient = require('../controller/Doctor/Patient');
const Notification = require('../controller/Doctor/Notification');
const Payment = require('../controller/Profile/Payment');
const router= express.Router();


router.get('/counts',userAuthMid,Booking.GetBookingCountTotal);

//booking
router.post('/add-booking',userAuthMid,Booking.AddBooking);
router.get('/get-booking',userAuthMid,Booking.GetBooking);
router.get('/booking',userAuthMid,Booking.PaginatedGetBooking);
router.post('/update-booking',userAuthMid,Booking.UpdateBooking);
router.get('/all-booking',userAuthMid,Booking.GetAllBooking);
router.get('/delete-booking',userAuthMid,Booking.DeleteBooking);

//Add Patient
router.post('/add-patient',userAuthMid,Patient.AddPatientsfromDoctor);
router.get('/get-patients',userAuthMid,Patient.GetPatientsPaginatedData);
router.get('/allpatients',userAuthMid,Patient.GetAllPatients);
router.post('/update-patients',userAuthMid,Patient.EditPatient);
router.get('/delete-patient',userAuthMid,Patient.DeletePatient);


//add Notification 
router.post('/add-notification',userAuthMid,Notification.AddNotification);
router.get('/get-notification',userAuthMid,Notification.GetNotificationById);


// cheifcomplaint
router.post('/add-cheifcomplaints',userAuthMid,ChiefComplaints.AddChiefComplaints);
router.get('/get-cheifcomplaints',userAuthMid,ChiefComplaints.GetChiefComplaints);
router.post('/update-cheifcomplaints',userAuthMid,ChiefComplaints.UpdateChiefComplaints);
router.get('/delete-cheifcomplaints',userAuthMid,ChiefComplaints.DeleteChiefComplaint);

//Medical History
router.post('/add-medicalhistory',userAuthMid,MedicalHistory.AddMedicalHistory);
router.get('/get-medicalhistory',userAuthMid,MedicalHistory.GetMedicalHistory);
router.post('/update-medicalhistory',userAuthMid,MedicalHistory.UpdateMedicalHistory);
router.get('/delete-medicalhistory',userAuthMid,MedicalHistory.DeleteMedicalHistory);

//Dental History 
router.post('/add-dentalhistory',userAuthMid,DentalHistory.AddDentalHistory);
router.get('/get-dentalhistory',userAuthMid,DentalHistory.GetDentalHistory);
router.post('/update-dentalhistory',userAuthMid,DentalHistory.UpdateDentalHistory);
router.get('/delete-dentalhistory',userAuthMid,DentalHistory.DeleteDentalHistory);

//DrugAllergy
router.post('/add-drugallergy',userAuthMid,DrugAllergy.AddDrugAllergy);
router.get('/get-drugallergy',userAuthMid,DrugAllergy.GetDrugAllergy);
router.post('/update-drugallergy',userAuthMid,DrugAllergy.UpdateDrugAllergy);
router.get('/delete-drugallergy',userAuthMid,DrugAllergy.DeleteDrugAllergy);

//DrugHistory
router.post('/add-drughistory',userAuthMid,DrugHistory.AddDrugHistory);
router.get('/get-drughistory',userAuthMid,DrugHistory.GetDrugHistory);
router.post('/update-drughistory',userAuthMid,DrugHistory.UpdateDrugHistory);
router.get('/delete-drughistory',userAuthMid,DrugHistory.DeleteDrugHistory);

//Diagnosis
router.post('/add-diagnosis',userAuthMid,Diagnosis.AddDiagnosis);
router.get('/get-diagnosis',userAuthMid,Diagnosis.GetDiagnosis);
router.post('/update-diagnosis',userAuthMid,Diagnosis.UpdateDiagnosis);
router.get('/delete-diagnosis',userAuthMid,Diagnosis.DeleteDiagnosis);

//TreatMent Plan
router.post('/add-treatmentplan',userAuthMid,TreatmentPlan.AddTreatmentPlan);
router.get('/get-treatmentplan',userAuthMid,TreatmentPlan.GetTreatmentPlan);
router.post('/update-treatmentplan',userAuthMid,TreatmentPlan.UpdateTreatmentPlan);
router.get('/delete-treatmentplan',userAuthMid,TreatmentPlan.DeleteTreatmentPlan);

//Treatment Details
router.post('/add-treatmentdetails',userAuthMid,TreatmentDetails.AddTreatmentDetails);
router.get('/get-treatmentdetails',userAuthMid,TreatmentDetails.GetTreatmentDetails);
router.post('/update-treatmentdetails',userAuthMid,TreatmentDetails.UpdateTreatmentDetails);
router.get('/delete-treatmentdetails',userAuthMid,TreatmentDetails.DeleteTreatmentDetails);

//Medicine
router.post('/add-medicine',userAuthMid,Medicine.AddMedicine);
router.get('/get-medicine',userAuthMid,Medicine.GetMedicine);
router.post('/update-medicine',userAuthMid,Medicine.UpdateMedicine);
router.get('/delete-medicine',userAuthMid,Medicine.DeleteMedicine);

//Examination Details
router.post('/add-examinationdetails',userAuthMid,ExaminationDetails.AddExaminationDetails);
router.get('/get-examinationdetails',userAuthMid,ExaminationDetails.GetExaminationDetails);
router.post('/update-examinationdetails',userAuthMid,ExaminationDetails.UpdateExaminationDetails);
router.get('/delete-examinationdetails',userAuthMid,ExaminationDetails.DeleteExaminationDetails);

//Lab Investigation
router.post('/add-labinvestigation',userAuthMid,upload.single('image'),LabInvestigation.AddLabInvestigation);
router.get('/get-labinvestigation',userAuthMid,LabInvestigation.GetLabInvestigation);
router.post('/update-labinvestigation',userAuthMid,upload.single('image'),LabInvestigation.UpdateLabInvestigation);
router.get('/delete-labinvestigation',userAuthMid,LabInvestigation.DeleteLabInvestigation);

// Next Appoinment
router.post('/add-newappoinment',userAuthMid,NewAppoinment.AddNewAppoinment);
router.get('/get-newappoinment',userAuthMid,NewAppoinment.GetNewAppoinment);
router.post('/update-newappoinment',userAuthMid,NewAppoinment.UpdateNewAppoinment);
router.get('/delete-newappoinment',userAuthMid,NewAppoinment.DeleteNewAppoinment);

//Points
router.post('/add-points',userAuthMid,Points.AddPoints);
router.get('/get-points',userAuthMid,Points.GetPoints);
router.post('/update-points',userAuthMid,Points.UpdatePoints);
router.get('/delete-points',userAuthMid,Points.DeletePoints);

//Payments
router.post('/add-payment',userAuthMid,Payment.AddFees);
router.get('/get-payment',userAuthMid,Payment.GetFeesByPatientId);
router.post('/update-payment',userAuthMid,Payment.EditFees);
router.get('/delete-payment',userAuthMid,Payment.DeleteFees);



module.exports=router;