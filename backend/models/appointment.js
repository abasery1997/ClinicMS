const mongoose = require("mongoose");

const Appointment = new mongoose.Schema({
   
    ///don't remove comments
    // doctorID: {type: mongoose.Schema.Types.ObjectId,required: "doctorID id is required" ,ref: "doctors"},
    doctorID: {type: mongoose.Schema.Types.ObjectId, required: "doctorID  is required" },
    employeeID: {type: mongoose.Schema.Types.ObjectId, required: "employeeID  is required" },
    patientID: {type: mongoose.Schema.Types.ObjectId, required: "patientID  is required" },
    appDate:{type:Date, required: "appDate is required"},
    status:{type:Boolean, required: "statues is required", default: false}
   
});

module.exports = mongoose.model("appointments", Appointment)

