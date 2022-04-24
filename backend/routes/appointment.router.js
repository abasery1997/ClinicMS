const express = require("express");
const { body, query, param } = require("express-validator")
const router = express.Router();
const {getAppointments,getAAppointment,addAppointment,updateAppointment,deleteAppointment,getAppointmentsById} = require("./../Controllers/appointment.controller")


//get all Appointments
router.get("", getAppointments);


//get a Appointment data
router.post("/one", getAAppointment);

//get a Appointments data by id
router.get("/id", getAppointmentsById);

//add new Appointment route
router.post("", [
    body("doctorID").isString().withMessage("doctorID should be object id"),
    body("employeeID").isString().withMessage("employeeID should be object id"),
    body("patientID").isString().withMessage("patientID should be object id"),
    body("appDate").isString().withMessage("appDate should be Date"),
   
], addAppointment);

//update Appointment route
router.put("", [
    body("doctorID").isString().withMessage("doctorID should be object id"),
    body("employeeID").isString().withMessage("employeeID should be object id"),
    body("patientID").isString().withMessage("patientID should be object id"),
    //need to be changed to date formate -isDate()- with all the other dates in db
    body("appDate").isString().withMessage("appDate should be Date"),
    body("status").isBoolean().withMessage("status should be boolean")
  
], updateAppointment);

router.delete("", deleteAppointment);
module.exports = router;