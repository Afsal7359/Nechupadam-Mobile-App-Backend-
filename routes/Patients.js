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
const router= express.Router();


//booking
router.post('/add-booking',userAuthMid,Booking.AddBooking);
router.get('/get-booking',userAuthMid,Booking.GetBooking);
router.get('/booking',userAuthMid,Booking.PaginatedGetBooking);
router.post('/update-booking',userAuthMid,Booking.UpdateBooking);

//Add Patient
router.post('/add-patient',userAuthMid,Patient.AddPatientsfromDoctor);
router.get('/get-patients',userAuthMid,Patient.GetPatientsPaginatedData);
router.get('/allpatients',userAuthMid,Patient.GetAllPatients);


//add Notification 
router.post('/add-notification',userAuthMid,Notification.AddNotification);
router.get('/get-notification',userAuthMid,Notification.GetNotificationById);


// cheifcomplaint
router.post('/add-cheifcomplaints',userAuthMid,ChiefComplaints.AddChiefComplaints);
router.get('/get-cheifcomplaints',userAuthMid,ChiefComplaints.GetChiefComplaints);
router.post('/update-cheifcomplaints',userAuthMid,ChiefComplaints.UpdateChiefComplaints);

//Medical History
router.post('/add-medicalhistory',userAuthMid,MedicalHistory.AddMedicalHistory);
router.get('/get-medicalhistory',userAuthMid,MedicalHistory.GetMedicalHistory);
router.post('/update-medicalhistory',userAuthMid,MedicalHistory.UpdateMedicalHistory);

//Dental History 
router.post('/add-dentalhistory',userAuthMid,DentalHistory.AddDentalHistory);
router.get('/get-dentalhistory',userAuthMid,DentalHistory.GetDentalHistory);
router.post('/update-dentalhistory',userAuthMid,DentalHistory.UpdateDentalHistory);

//DrugAllergy
router.post('/add-drugallergy',userAuthMid,DrugAllergy.AddDrugAllergy);
router.get('/get-drugallergy',userAuthMid,DrugAllergy.GetDrugAllergy);
router.post('/update-drugallergy',userAuthMid,DrugAllergy.UpdateDrugAllergy);

//DrugHistory
router.post('/add-drughistory',userAuthMid,DrugHistory.AddDrugHistory);
router.get('/get-drughistory',userAuthMid,DrugHistory.GetDrugHistory);
router.post('/update-drughistory',userAuthMid,DrugHistory.UpdateDrugHistory);

//Diagnosis
router.post('/add-diagnosis',userAuthMid,Diagnosis.AddDiagnosis);
router.get('/get-diagnosis',userAuthMid,Diagnosis.GetDiagnosis);
router.post('/update-diagnosis',userAuthMid,Diagnosis.UpdateDiagnosis);

//TreatMent Plan
router.post('/add-treatmentplan',userAuthMid,TreatmentPlan.AddTreatmentPlan);
router.get('/get-treatmentplan',userAuthMid,TreatmentPlan.GetTreatmentPlan);
router.post('/update-treatmentplan',userAuthMid,TreatmentPlan.UpdateTreatmentPlan);

//Treatment Details
router.post('/add-treatmentdetails',userAuthMid,TreatmentDetails.AddTreatmentDetails);
router.get('/get-treatmentdetails',userAuthMid,TreatmentDetails.GetTreatmentDetails);
router.post('/update-treatmentdetails',userAuthMid,TreatmentDetails.UpdateTreatmentDetails);

//Medicine
router.post('/add-medicine',userAuthMid,Medicine.AddMedicine);
router.get('/get-medicine',userAuthMid,Medicine.GetMedicine);
router.post('/update-medicine',userAuthMid,Medicine.UpdateMedicine);

//Examination Details
router.post('/add-examinationdetails',userAuthMid,ExaminationDetails.AddExaminationDetails);
router.get('/get-examinationdetails',userAuthMid,ExaminationDetails.GetExaminationDetails);
router.post('/update-examinationdetails',userAuthMid,ExaminationDetails.UpdateExaminationDetails);

//Lab Investigation
router.post('/add-labinvestigation',userAuthMid,upload.single('image'),LabInvestigation.AddLabInvestigation);
router.get('/get-labinvestigation',userAuthMid,LabInvestigation.GetLabInvestigation);
router.post('/update-labinvestigation',userAuthMid,upload.single('image'),LabInvestigation.UpdateLabInvestigation);

// Next Appoinment
router.post('/add-newappoinment',userAuthMid,NewAppoinment.AddNewAppoinment);
router.get('/get-newappoinment',userAuthMid,NewAppoinment.GetNewAppoinment);
router.post('/update-newappoinment',userAuthMid,NewAppoinment.UpdateNewAppoinment);

//Points
router.post('/add-points',userAuthMid,Points.AddPoints);
router.get('/get-points',userAuthMid,Points.GetPoints);
router.post('/update-points',userAuthMid,Points.UpdatePoints);


module.exports=router;