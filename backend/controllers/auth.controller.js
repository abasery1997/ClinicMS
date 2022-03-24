const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")

const Doctor = require("../models/doctors");
const Employee = require("../models/employee");
const Patient = require("../models/patient");

exports.login = (req, res, next) => {
    const { email, password, type } = req.body;

    switch (type) {
        case 'a':

            break;
        case 'd':
            Doctor.findOne({ email },{password:0,__v:0})
                .then(doctor => {
                    if (doctor != null) {
                        //check password

                        const validPassword = bcrypt.compareSync(password, doctor.password)
                        if (!validPassword) return res.status(400).json({ error: "Invalid Credentials" })

                        const user = { id: doctor._id, email, type };
                        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
                        res.status(200).json({ accessToken, user: doctor });
                    } else {
                        throw new Error("Email or password not valid");
                    }
                }).catch(error => {
                    error.status = 500;
                    next(error.message);
                })
            break;
        case 'e':
            Employee.findOne({ email },{password:0,__v:0})
                .then(employee => {
                    if (employee != null) {

                        const validPassword = bcrypt.compareSync(password, employee.password)
                        if (!validPassword) return res.status(400).json({ error: "Invalid Credentials" })

                        const user = { id: employee._id, email, type };
                        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
                        res.status(200).json({ accessToken, user: employee });
                    } else {
                        throw new Error("Email or password not valid");
                    }
                }).catch(error => {
                    error.status = 500;
                    next(error.message);
                })
            break;
        case 'p':
            Patient.findOne({ email },{password:0,__v:0})
                .then(patient => {
                    if (patient != null) {
                        const validPassword = bcrypt.compareSync(password, patient.password)
                        if (!validPassword) return res.status(400).json({ error: "Invalid Credentials" })

                        const user = { id: patient._id, email, type };
                        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
                        res.status(200).json({ accessToken, user: patient });
                    } else {
                        throw new Error("Email or password not valid");
                    }
                }).catch(error => {
                    error.status = 500;
                    next(error.message);
                })
            break;

    }

}