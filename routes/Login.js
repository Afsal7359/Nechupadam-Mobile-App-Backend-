const express = require('express');
const login = require('../controller/Patients/login');
const Login = require('../controller/Doctor/Login');
const router = express.Router();

router.post('/patient/login',login.PatientLogin);
router.post('/patient/register',login.PatientRegister);

router.post('/sendotptopatient',login.SendOtpToPatient);
router.post('/verifyotppatient',login.ValidatePatientsOTP);

router.post('/doctor/login',Login.DoctorLogin);

module.exports=router;