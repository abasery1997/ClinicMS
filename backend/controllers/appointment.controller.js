const { validationResult } = require("express-validator");
const Appointment = require("../models/appointment");
///don't remove comments

const Doctor = require("../models/doctors");
const Employee = require("../models/employee");
const Patient = require("../models/patient");

//get all appointments
exports.getAppointments = (req, res, next) => {
    Appointment.find({})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}

//get specific Appointment 
exports.getAAppointment = (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    let id = req.body.id;
    Appointment.findById(id)
        .then(data => {
            console.log(data);
            if (data == null) {
                throw new Error("Appointment not Found!")
            } else {
                res.status(200).json({ data })
            }
        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}
//add new Appointment
exports.addAppointment = (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    let appDate = new Date(req.body.appDate);
    let appointment = new Appointment({
        doctorID: req.body.doctorID,
        employeeID: req.body.employeeID,
        patientID: req.body.patientID,
        appDate: appDate,
        
    });
    appointment.save()
        .then(data => {
            res.status(201).json({ id: data._id })
        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })






}
//update Appointment
exports.updateAppointment = (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    let appDate = new Date(req.body.appDate);
    Appointment.findByIdAndUpdate(req.body.id, {
        $set: {
            doctorID: req.body.doctorID,
            employeeID: req.body.employeeID,
            patientID: req.body.patientID,
            appDate: appDate,
            status:req.body.status
        }
    })
        .then(data => {
            if (data == null) {
                throw new Error("Appointment not Found!")
            } else {

                res.status(200).json({ message: "updated" })
            }

        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}

//delete Appointment
exports.deleteAppointment = (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    let id = req.body.id;
    Appointment.findByIdAndDelete(id)
        .then((data) => {
            if (data == null) {
                throw new Error("Appointment not Found!")
            } else {
                res.status(200).json({ message: "deleted" })
            }
        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}