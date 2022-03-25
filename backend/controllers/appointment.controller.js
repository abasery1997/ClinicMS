const { validationResult } = require("express-validator");
const Appointment = require("../models/appointment");
///don't remove comments

const Doctor = require("../models/doctors");
const Employee = require("../models/employee");
const Patient = require("../models/patient");

//get all appointments
exports.getAppointments = (req, res, next) => {
    Appointment.find({},{__v:0})
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
    const {id} = req.body;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    Appointment.findById(id,{__v:0})
        .then(data => {
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
exports.addAppointment = async (req, res, next) => {
    try {
        const { doctorID, employeeID, patientID } = req.body;
        let appDate = new Date(req.body.appDate);
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            let error = new Error();
            error.status = 422;
            error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
            throw error;
        }
        // await Doctor.findById(doctorID).then(d => { if (!d) { throw new Error("Doctor not Found!") } })
        // await Employee.findById(employeeID).then(e => { if (!e) { throw new Error("Employee not Found!") } })
        // await Patient.findById(patientID).then(p => { if (!p) { throw new Error("Patient not Found!") } })

        let appointment = await new Appointment({
            doctorID, employeeID, patientID, appDate
        });
        const app = await appointment.save()
        await res.status(201).json({ id: app._id })
    }
    catch (error) {
        error.status = 500;
        next(error.message);
    }
}
//update Appointment
exports.updateAppointment = async (req, res, next) => {
    try {
        const { id,doctorID, employeeID, patientID, status } = req.body;
        let appDate = new Date(req.body.appDate);
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            let error = new Error();
            error.status = 422;
            error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
            throw error;
        }
        // await Doctor.findById(doctorID).then(d => { if (!d) { throw new Error("Doctor not Found!") } })
        // await Employee.findById(employeeID).then(e => { if (!e) { throw new Error("Employee not Found!") } })
        // await Patient.findById(patientID).then(p => { if (!p) { throw new Error("Patient not Found!") } })

        const app = await Appointment.findByIdAndUpdate(id, {
            $set: {
                doctorID, employeeID, patientID, appDate, status
            }
        })
        if (app == null) {
            throw new Error("Appointment not Found!")
        } else {
            await res.status(200).json({ message: "updated" })
        }

    }
    catch (error) {
        error.status = 500;
        next(error.message);
    }

}

//delete Appointment
exports.deleteAppointment = (req, res, next) => {
    const {id}=req.body;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
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