const { validationResult } = require("express-validator");
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
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    let id = req.body._id;
    console.log(id);
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
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    let birthDate = new Date(req.body.birthDate);
    let patient = new Patient({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        image: req.file.filename,
        password: req.body.password,
        gender: req.body.gender,
        birthDate: birthDate,
        phone: req.body.phone,
        emergencyPhone: req.body.emergencyPhone,
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
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    let birthDate = new Date(req.body.birthDate);
    Patient.findByIdAndUpdate(req.body._id, {
        $set: {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            gender: req.body.gender,
            birthDate: birthDate,
            phone: req.body.phone,
            emergencyPhone: req.body.emergencyPhone,

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
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    let id = req.body._id;
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