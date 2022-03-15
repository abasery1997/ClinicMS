const { validationResult } = require("express-validator");
const Doctor = require("./../Models/doctors");

exports.getDoctors = (req, res, next) => {
    Doctor.find({})
        .then(data => {
            res.status(200).json(data)

        })
        .catch(error => {
           
            next(error);
        })
}

exports.addDoctor = (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    let birthDate= new Date( req.body.birthDate);
    let doctor = new Doctor({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender,
        birthDate:  birthDate,
        clinicServiceID: req.body.clinicServiceID,
        attendingDays: req.body.attendingDays,
        startTime: req.body.startTime,
        endTime: req.body.endTime
    });
    doctor.save()
    .then(data=>{
        res.status(201).json({message:"added",data})
    })
    .catch(error => {
        error.status = 500;
        next(error);
    })

}