const { validationResult } = require("express-validator");
const Prescription = require("../models/prescription");

//get all Prescriptions
exports.getPrescription = (req, res, next) => {
    Prescription.find({})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}

//get specific Prescription 
exports.getAPrescription = (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    let id = req.body._id;
    Prescription.findById(id)
        .then(data => {
            console.log(data);
            if (data == null) {
                throw new Error("Prescription not Found!")
            } else {
                res.status(200).json({ data })
            }
        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}
//add new Prescription
exports.addPrescription = (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    let prescription = new Prescription({
        appointmentID: req.body.appointmentID,
        medicineArr: req.body.medicineArr,        
    });
    prescription.save()
        .then(data => {
            res.status(201).json({ id: data._id })
        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}
//update Prescription
exports.updatePrescription = (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    Prescription.findByIdAndUpdate(req.body._id, {
        $set: {
            appointmentID: req.body.appointmentID,
            medicineArr: req.body.medicineArr,
        }
    })
        .then(data => {
            if (data == null) {
                throw new Error("Prescription not Found!")
            } else {

                res.status(200).json({ message: "updated" })
            }

        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}

//delete Prescription
exports.deletePrescription = (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    let id = req.body._id;
    Prescription.findByIdAndDelete(id)
        .then((data) => {
            if (data == null) {
                throw new Error("Prescription not Found!")
            } else {
                res.status(200).json({ message: "deleted" })
            }
        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}