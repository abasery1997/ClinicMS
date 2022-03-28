const express = require("express");
const { body, query, param } = require("express-validator")
const router = express.Router();
const {getPrescription,getAPrescription,addPrescription,updatePrescription,deletePrescription} = require("../Controllers/prescription.controller")


//get all Prescriptions
router.get("", getPrescription);


//get a Prescription data
router.post("/one", getAPrescription);

//add new Prescription route
router.post("", [
    body("appointmentID").isString().withMessage("Appointment ID should be object id"),
    body("medicineArr").isArray({min:0}).withMessage("Medicine should be an Array of Objects "),
], addPrescription);

//update Prescription route
router.put("", [
    body("appointmentID").isString().withMessage("Appointment ID should be object id"),
    body("medicineArr").isArray({min:0}).withMessage("Medicine should be an Array of Objects "),
], updatePrescription);

router.delete("", deletePrescription);
module.exports = router;