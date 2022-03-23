const express = require("express");
const { body, query, param } = require("express-validator")
const router = express.Router();
const {getPrescription,getAPrescription,addPrescription,updatePrescription,deletePrescription} = require("../Controllers/prescription.controller")


//get all Appointments
router.get("", getPrescription);


//get a Appointment data
router.get("/one", getAPrescription);

//add new Appointment route
router.post("", [
    body("appointmentID").isString().withMessage("Appointment ID should be object id"),
    body("medicineArr").isArray({min:0}).withMessage("Medicine should be an Array of Objects "),   
], addPrescription);

//update Appointment route
router.put("", [
    body("appointmentID").isString().withMessage("Appointment ID should be object id"),
    body("medicineArr").isArray({min:0}).withMessage("Medicine should be an Array of Objects "),  
  
], updatePrescription);

router.delete("", deletePrescription);
module.exports = router;