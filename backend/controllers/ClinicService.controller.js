const { validationResult } = require("express-validator");
const ClinicService = require("../models/ClinicService");


//get all Services
exports.getClinicServices = (req, res, next) => {
    ClinicService.find({},{__v:0})
        .then(data => {
            res.status(200).json(data)

        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}

//get specific service
exports.getAClinicService = (req, res, next) => {
    const { _id } = req.body;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    ClinicService.findById(_id,{__v:0})
        .then(data => {
            if (data == null) {
                throw new Error("Clinic Service not Found!")
            } else {
                res.status(200).json({ data })
            }
        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}
//add new Clinic Service
exports.addClinicService = (req, res, next) => {
    const { name, invoiceAmount } = req.body;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    let clinicService = new ClinicService({
        name, invoiceAmount
    });
    clinicService.save()
        .then(data => {
            res.status(201).json({ id: data._id })
        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })

}
//update Clinic Service
exports.updateClinicService = (req, res, next) => {
    const { _id, name, invoiceAmount } = req.body;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    ClinicService.findByIdAndUpdate(_id, {
        $set: {
            name, invoiceAmount
        }
    })
        .then(data => {
            if (data == null) {
                throw new Error("Clinic Service not Found!")
            } else {

                res.status(200).json({ message: "updated" })
            }

        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}

//delete Clinic Service
exports.deleteClinicService = (req, res, next) => {
    const { _id } = req.body;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    ClinicService.findByIdAndDelete(_id)
        .then((data) => {
            if (data == null) {
                throw new Error("Clinic Service not Found!")
            } else {
                res.status(200).json({ message: "deleted" })
            }
        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}