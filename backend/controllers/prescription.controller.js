const { validationResult } = require("express-validator");
const Prescription = require("../models/prescription");
const Appointment = require("../models/appointment");

//get all Prescriptions
exports.getPrescription = (req, res, next) => {
    Prescription.find({}, { __v: 0 })
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
    const { _id } = req.body;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    Prescription.findById(_id, { __v: 0 })
        .then(data => {
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
exports.addPrescription = async (req, res, next) => {
    try {
        const { appointmentID, medicineArr } = req.body;
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            let error = new Error();
            error.status = 422;
            error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
            throw error;
        }
        // await Appointment.findById(appointmentID).then(a => { if (!a) { throw new Error("Appointment not Found!") } })

        let prescription = await new Prescription({
            appointmentID, medicineArr
        });

        const pres = await prescription.save()
      await  res.status(201).json({ id: pres._id })


    }
    catch (error) {
        error.status = 500;
        next(error.message);
    }

}
//update Prescription
exports.updatePrescription = async (req, res, next) => {
    try {


        const { _id, appointmentID, medicineArr } = req.body;
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            let error = new Error();
            error.status = 422;
            error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
            throw error;
        }

        // await Appointment.findById(appointmentID).then(a => { if (!a) { throw new Error("Appointment not Found!") } })

        let pres = await Prescription.findByIdAndUpdate(_id, {
            $set: {
                appointmentID, medicineArr
            }
        })
        if (pres == null) {
            throw new Error("Prescription not Found!")
        } else {
           await  res.status(200).json({ message: "updated" })
        }

    }
    catch (error) {
        error.status = 500;
        next(error.message);
    }

}

//delete Prescription
exports.deletePrescription = (req, res, next) => {
    const { _id } = req.body;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    Prescription.findByIdAndDelete(_id)
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