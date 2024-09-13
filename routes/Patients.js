const express = require('express');
const userAuthMid = require('../Middlewear/Auth-middlewear');
const ChiefComplaints = require('../controller/Profile/ChiefComplaints');
const MedicalHistory = require('../controller/Profile/MedicalHistory');
const CheifComplaint = require('../models/ChiefComplaints');
const DentalHistory = require('../controller/Profile/DentalHistory');
const DrugAllergy = require('../controller/Profile/DrugAllergy');
const DrugHistory = require('../controller/Profile/DrugHistory');
const router= express.Router();


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



module.exports=router;