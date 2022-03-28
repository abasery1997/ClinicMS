const express = require("express");
const { body, query, param } = require("express-validator")
const router = express.Router();
const { getAllPatients, getAPatient, addPatient, updatePatient, deletePatient } = require("./../Controllers/patient.controller")


//get all Patient
router.get("", getAllPatients);


//get a Patient data
router.post("/one", getAPatient);

//add new Patient route
router.post("", [
    body("firstname").isString().withMessage("Patient First Name should be String"),
    body("lastname").isString().withMessage("Patient Last Name should be String"),
    body("email").isEmail().withMessage("email format not correct"),
    body("gender").isIn(['m', 'f']).withMessage("Patient Name should be String"),
    body("phone").isNumeric().matches(/^01[0-2,5]{1}[0-9]{8}$/).withMessage("phone contains numbers only"),
    body("emergencyPhone").isNumeric().matches(/^01[0-2,5]{1}[0-9]{8}$/).withMessage("wrong phone number")
], addPatient);

//update Patient route
router.put("", [
    body("firstname").isString().withMessage("Patient First Name should be String"),
    body("lastname").isString().withMessage("Patient Last Name should be String"),
    body("email").isEmail().withMessage("email format not correct"),
    body("gender").isIn(['m', 'f']).withMessage("Patient Name should be String"),
    body("phone").isNumeric().matches(/^01[0-2,5]{1}[0-9]{8}$/).withMessage("phone contains numbers only"),
    body("emergencyPhone").isNumeric().withMessage("emergency Phone contains numbers only")

], updatePatient);

router.delete("", deletePatient);
module.exports = router;