const jwt = require('jsonwebtoken');
const { validationResult } = require("express-validator");

const Doctor = require("../models/doctors");
const Employee = require("../models/employee");
const Patient = require("../models/patient");

exports.login = (req, res, next) => {
    let type = req.body.type;
    switch (type) {
        case 'a':

            break;
        case 'd':
            Doctor.findOne({ 'email': req.body.email })
                .then(doctor => {
                    if (doctor != null && doctor.password == req.body.password) {

                        const user = {id:doctor._id, email: req.body.email ,type:type};
                        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
                        res.status(200).json({ accessToken});
                    }else{
                        throw new Error("Email or password not valid");
                    }
                }) .catch(error => {
                    error.status = 500;
                    next(error.message);
                })
            break;
        case 'e':
            Employee.findOne({ 'email': req.body.email })
                .then(employee => {
                    if (employee != null && employee.password == req.body.password) {

                        const user = {id:employee._id, email: req.body.email ,type:type};
                        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
                        res.status(200).json({ accessToken});
                    }else{
                        throw new Error("Email or password not valid");
                    }
                }) .catch(error => {
                    error.status = 500;
                    next(error.message);
                })
            break;
        case 'p':
            Patient.findOne({ 'email': req.body.email })
                .then(patient => {
                    if (patient != null && patient.password == req.body.password) {

                        const user = {id:patient._id, email: req.body.email ,type:type};
                        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
                        res.status(200).json({ accessToken});
                    }else{
                        throw new Error("Email or password not valid");
                    }
                }) .catch(error => {
                    error.status = 500;
                    next(error.message);
                })
            break;
        
    }
    
}