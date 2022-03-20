const mongoose = require("mongoose");

const Doctor = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname:{ type: String, required: true },
    image:{type:String},
    birthDate: { type: Date, required: "birthDate is required" },
    email: { type: String, required: "email is required" ,unique: true },
    password: { type: String, required: "password is required" },
    gender: { type: String, enum: ['m', 'f'], required: "gender is required" },
    clinicServiceID: { type: Number, required: "clinicService id is required" },
    attendingDays:{ type:String, required: "attendingDays is required" },
    phone:{type:String, required: "phone is required", unique: true},
    startTime:{
        h:Number,
        m:Number
        
    },
    endTime:{
        h:Number,
        m:Number
       
    }
});

module.exports = mongoose.model("doctors", Doctor)

