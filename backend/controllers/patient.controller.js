const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt")
const Patient = require("../models/patient");


//get all Patients
exports.getAllPatients = (req, res, next) => {
    Patient.find({})
        .then(data => {
            res.status(200).json(data)

        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}

//get specific Patient 
exports.getAPatient = (req, res, next) => {
    const {id}=req.body;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    Patient.findById(id)
        .then(data => {
            console.log(data);
            if (data == null) {
                throw new Error("Patient not Found!")
            } else {
                res.status(200).json({ data })
            }
        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}
//add new Patient
exports.addPatient = (req, res, next) => {
    const { firstname, lastname, password, email, gender, phone, emergencyPhone } = req.body;
    let birthDate = new Date(req.body.birthDate);

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    let patient = new Patient({
        firstname, lastname, email,
        image: req.file.filename,
        password: bcrypt.hashSync(password, 10),
        gender, birthDate, phone, emergencyPhone,
    });
    patient.save()
        .then(data => {
            res.status(201).json({ id: data._id })
        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}
//update Patient
exports.updatePatient = (req, res, next) => {
    const { id, firstname, lastname, password, email, gender, phone, emergencyPhone } = req.body;
    let birthDate = new Date(req.body.birthDate);
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }

    Patient.findByIdAndUpdate(id, {
        $set: {
            firstname, lastname, email,
            password: bcrypt.hashSync(password, 10),
            gender, birthDate, phone, emergencyPhone
        }
    })
        .then(data => {
            if (data == null) {
                throw new Error("Employee not Found!")
            } else {

                res.status(200).json({ message: "updated" })
            }

        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}

//delete Patient
exports.deletePatient = (req, res, next) => {
    const {id}=req.body;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    Patient.findByIdAndDelete(id)
        .then((data) => {
            if (data == null) {
                throw new Error("Patient not Found!")
            } else {
                res.status(200).json({ message: "deleted" })
            }
        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}