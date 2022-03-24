const { validationResult } = require("express-validator");
const Prescription = require("../models/prescription");
const Appointment = require("../models/appointment");

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
    const { id } = req.body;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
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
        res.status(201).json({ id: pres._id })


    }
    catch (error) {
        error.status = 500;
        next(error.message);
    }

}
//update Prescription
exports.updatePrescription = (req, res, next) => {
    const { id, appointmentID, medicineArr } = req.body;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }

    // await Appointment.findById(appointmentID).then(a => { if (!a) { throw new Error("Appointment not Found!") } })
    
    Prescription.findByIdAndUpdate(id, {
        $set: {
            appointmentID, medicineArr
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
    const { id } = req.body;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
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