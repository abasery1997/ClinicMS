const express = require("express");
const { body, query, param } = require("express-validator")
const router = express.Router();
const {getAllPatients,getAPatient,addPatient,updatePatient,deletePatient} = require("./../Controllers/patient.controller")


//get all Patient
router.get("", getAllPatients);


//get a Patient data
router.get("/one", getAPatient);

//add new Patient route
router.post("", [
    body("firstname").isString().withMessage("Patient Name should be String"),
    body("lastname").isString().withMessage("Patient Name should be String"),
    body("email").isEmail().withMessage("email format not correct"),
    body("gender").isIn(['m', 'f']).withMessage("Patient Name should be String"),
    body("phone").isNumeric().withMessage("phone contains numbers only"),
    body("emergencyPhone").isNumeric().withMessage("emergency Phone contains numbers only")
], addPatient);

//update Patient route
router.put("", [
    body("name").isString().withMessage("Patient Name should be String"),
    body("email").isEmail().withMessage("email format not correct"),
    body("gender").isIn(['m', 'f']).withMessage("Patient Name should be String"),
    body("phone").isNumeric().withMessage("phone contains numbers only"),
    body("emergencyPhone").isNumeric().withMessage("emergency Phone contains numbers only")
  
], updatePatient);

router.delete("", deletePatient);
module.exports = router;