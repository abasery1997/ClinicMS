const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt")
const Doctor = require("../models/doctors");
const ClinicService = require("../models/ClinicService");

//get all doctors
exports.getDoctors = (req, res, next) => {
    Doctor.find({})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}

//get specific doctor 
exports.getADoctor = (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    let id = req.body._id;
    console.log(id);
    Doctor.findById(id)
        .then(data => {
            console.log(data);
            if (data == null) {
                throw new Error("Doctor not Found!")
            } else {
                res.status(200).json({ data })
            }
        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}
//add new doctor
exports.addDoctor = async (req, res, next) => {
    try {
        const { firstname, lastname, password, email, gender, phone, clinicServiceID, attendingDays, startTime, endTime } = req.body;
        let birthDate = new Date(req.body.birthDate);
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            let error = new Error();
            error.status = 422;
            error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
            throw error;
        }
        //check clinic service exists
        await ClinicService.findById(req.body.clinicServiceID).then(c => { if (!c) { throw new Error("ClinicService not Found!") } })
       
        //check duplicated email
        const existedDoctor = await Doctor.findOne({ email })
        if (existedDoctor) return res.status(400).json({ error: "Email Already Exists" })
       
        let doctor = await new Doctor({
            firstname, lastname, email,
            image: req.file.filename,
            password:bcrypt.hashSync(password, 10),
            gender, phone, birthDate,
            clinicServiceID, attendingDays,
            startTime, endTime
        });
        const doc = await doctor.save()
        await res.status(201).json({ id: doc._id })


    }
    catch (error) {
        error.status = 500;
        next(error.message);
    }







}
//update doctor
exports.updateDoctor = (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    let birthDate = new Date(req.body.birthDate);
    Doctor.findByIdAndUpdate(req.body._id, {
        $set: {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            gender: req.body.gender,
            phone: req.body.phone,
            birthDate: birthDate,
            clinicServiceID: req.body.clinicServiceID,
            attendingDays: req.body.attendingDays,
            startTime: req.body.startTime,
            endTime: req.body.endTime
        }
    })
        .then(data => {
            if (data == null) {
                throw new Error("Doctor not Found!")
            } else {

                res.status(200).json({ message: "updated" })
            }

        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}

//delete doctor
exports.deleteDoctor = (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    let id = req.body._id;
    Doctor.findByIdAndDelete(id)
        .then((data) => {
            if (data == null) {
                throw new Error("Doctor not Found!")
            } else {
                res.status(200).json({ message: "deleted" })
            }
        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}