const { validationResult } = require("express-validator");
const ClinicService = require("./../Models/ClinicService");


//get all Services
exports.getClinicServices = (req, res, next) => {
    ClinicService.find({})
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
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    let id = req.body.id;
    console.log(id);
    ClinicService.findById(id)
        .then(data => {
            console.log(data);
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
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    let clinicService = new ClinicService({
        name:req.body.name,
        invoiceAmount: req.body.invoiceAmount,
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
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    ClinicService.findByIdAndUpdate(req.body.id, {
        $set: {
            name:req.body.name,
            invoiceAmount: req.body.invoiceAmount,
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
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    let id = req.body.id;
    ClinicService.findByIdAndDelete(id)
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