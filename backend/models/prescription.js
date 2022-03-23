const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");

const Prescription = new mongoose.Schema({

    ///don't remove comments
    // appointmentID: {type: mongoose.Schema.Types.ObjectId,required: "Appointment ID  is required"},
    appointmentID: { type: mongoose.Schema.Types.ObjectId, required: "Appointment ID  is required" },
    medicineArr: [{
        name: { type: mongoose.Schema.Types.String, required: "Name of Medicine should be String" },
        perDay: {
            type: mongoose.Schema.Types.Number, min: 1, validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer value'
            }
            , required: "per Day must Postive Number"
        },_id: false
    }],
});

module.exports = mongoose.model("prescription", Prescription);


