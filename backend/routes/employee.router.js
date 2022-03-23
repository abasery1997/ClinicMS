const express = require("express");
const { body, query, param } = require("express-validator")
const router = express.Router();
const {getAllEmployees ,getAnEmployee ,addEmployee,updateEmployee,deleteEmployee  } = require("./../Controllers/employee.controller")


//get all Employees
router.get("", getAllEmployees);


//get an employee data
router.get("/one", getAnEmployee);

//add new employee route
router.post("", [
    body("firstname").isString().withMessage("Employee Name should be String"),
    body("lastname").isString().withMessage("Employee Name should be String"),
    body("email").isEmail().withMessage("email format not correct"),
    body("gender").isIn(['m', 'f']).withMessage("Employee Name should be String"),
    body("phone").isNumeric().matches(/^01[0-2,5]{1}[0-9]{8}$/).withMessage("wrong phone number")
], addEmployee);

//update Employee route
router.put("", [
    body("name").isString().withMessage("Employee Name should be String"),
    body("email").isEmail().withMessage("email format not correct"),
    body("gender").isIn(['m', 'f']).withMessage("Employee Name should be String"),
    body("phone").isNumeric().withMessage("phone contains numbers only")
], updateEmployee);

router.delete("", deleteEmployee);
module.exports = router;