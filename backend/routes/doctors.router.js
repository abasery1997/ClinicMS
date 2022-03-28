const express = require("express");
const { body, query, param } = require("express-validator")
const router = express.Router();
const { getDoctors, getADoctor, addDoctor, updateDoctor, deleteDoctor ,getDoctorsByClinciService} = require("./../Controllers/doctors.controller")


//get all doctors
router.get("", getDoctors);


//get a doctor data
router.post("/one", getADoctor);

router.get("/ClinicService", getDoctorsByClinciService);


//add new doctor route
router.post("", [
    body("firstname").isString().withMessage("Doctor First Name should be String"),
    body("lastname").isString().withMessage("Doctor Last Name should be String"),
    body("email").isEmail().withMessage("email format not correct"),
    body("gender").isIn(['m', 'f']).withMessage("Gender should be m or f "),
    body("phone").isNumeric().matches(/^01[0-2,5]{1}[0-9]{8}$/).withMessage("wrong phone number"),
    body("attendingDays").isString().withMessage("attendingDays should be String"),
    body("startTime").isObject().withMessage("startTime should be object"),
    body("endTime").isObject().withMessage("endTime should be object")
], addDoctor);

//update doctor route
router.put("", [
    body("firstname").isString().withMessage("Doctor First Name should be String"),
    body("lastname").isString().withMessage("Doctor Last Name should be String"),
    body("email").isEmail().withMessage("email format not correct"),
    body("gender").isIn(['m', 'f']).withMessage("Gender should be m or f "),
    body("phone").isNumeric().matches(/^01[0-2,5]{1}[0-9]{8}$/).withMessage("wrong phone number"),
    body("attendingDays").isString().withMessage("attendingDays should be String"),
    body("startTime").isObject().withMessage("startTime should be object"),
    body("endTime").isObject().withMessage("endTime should be object")
], updateDoctor);

router.delete("", deleteDoctor);
module.exports = router;