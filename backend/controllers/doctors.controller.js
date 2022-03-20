const { validationResult } = require("express-validator");
const Doctor = require("./../Models/doctors");


//get all doctors
exports.getDoctors = (req, res, next) => {
    Doctor.find({})
        .then(data => {
            res.status(200).json(data)

        })
        .catch(error => {

            next(error);
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
    let id = req.body.id;
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

            next(error);
        })
}
//add new doctor
exports.addDoctor = (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    let birthDate = new Date(req.body.birthDate);
    let doctor = new Doctor({
        firstname: req.body.firstname,
        lastname:req.body.lastname,
        email: req.body.email,
        image:req.file.filename,
        password: req.body.password,
        gender: req.body.gender,
        birthDate: birthDate,
        clinicServiceID: req.body.clinicServiceID,
        attendingDays: req.body.attendingDays,
        startTime: req.body.startTime,
        endTime: req.body.endTime
    });
    doctor.save()
        .then(data => {
            res.status(201).json({ id: data._id })
        })
        .catch(error => {
            error.status = 500;
            next(error);
        })

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
    Doctor.findByIdAndUpdate(req.body.id, {
        $set: {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            gender: req.body.gender,
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
        .catch(error => next(error))
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
    let id = req.body.id;
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
            next(error);
        })
}