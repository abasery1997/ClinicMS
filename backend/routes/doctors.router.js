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
    body("firstname").isString().withMessage("Doctor Name should be String"),
    body("lastname").isString().withMessage("Doctor Name should be String"),
    body("email").isEmail().withMessage("email format not correct"),
    body("gender").isIn(['m', 'f']).withMessage("Doctor Name should be String"),
    body("phone").isNumeric().withMessage("phone contains numbers only"),
    body("attendingDays").isString().withMessage("attendingDays should be String"),
    body("startTime").isObject().withMessage("startTime should be object"),
    body("endTime").isObject().withMessage("endTime should be object")
], addDoctor);

//update doctor route
router.put("", [
    body("name").isString().withMessage("Doctor Name should be String"),
    body("email").isEmail().withMessage("email format not correct"),
    body("gender").isIn(['m', 'f']).withMessage("Doctor Name should be String"),
    body("phone").isNumeric().withMessage("phone contains numbers only"),
    body("attendingDays").isString().withMessage("attendingDays should be String"),
    body("startTime").isObject().withMessage("startTime should be object"),
    body("endTime").isObject().withMessage("endTime should be object")
], updateDoctor);

router.delete("", deleteDoctor);
module.exports = router;