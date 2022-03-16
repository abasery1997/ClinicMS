const express = require("express");
const { body, query, param } = require("express-validator")
const router = express.Router();
const { getDoctors, getADoctor, addDoctor, updateDoctor, deleteDoctor } = require("./../Controllers/doctors.controller")


//get all doctors
router.get("", getDoctors);


//get a doctor data
router.get("/one", getADoctor);

//add new doctor route
router.post("", [
    body("name").isAlpha().withMessage("Doctor Name should be String"),
    body("email").isEmail().withMessage("email format not correct"),
    body("gender").isIn(['m', 'f']).withMessage("Doctor Name should be String"),
    // body("birthDate").isDate().withMessage("birthDate should be date"),
    body("clinicServiceID").isInt().withMessage("clinicServiceID should be integer"),
    body("attendingDays").isAlpha().withMessage("attendingDays should be String"),
    body("startTime").isObject().withMessage("startTime should be object"),
    body("endTime").isObject().withMessage("endTime should be object")
], addDoctor);

//update doctor route
router.put("", [
    body("name").isAlpha().withMessage("Doctor Name should be String"),
    body("email").isEmail().withMessage("email format not correct"),
    body("gender").isIn(['m', 'f']).withMessage("Doctor Name should be String"),
    // body("birthDate").isDate().withMessage("birthDate should be date"),
    body("clinicServiceID").isInt().withMessage("clinicServiceID should be integer"),
    body("attendingDays").isAlpha().withMessage("attendingDays should be String"),
    body("startTime").isObject().withMessage("startTime should be object"),
    body("endTime").isObject().withMessage("endTime should be object")
], updateDoctor);

router.delete("", deleteDoctor);
module.exports = router;