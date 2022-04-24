const mongoose = require("mongoose");

const Employee = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    image: { type: String },
    birthDate: { type: Date, required: "birthDate is required" },
    email: { type: String, required: "email is required", unique: true },
    password: { type: String, required: "password is required" },
    gender: { type: String, enum: ['m', 'f'], required: "gender is required" },
    phone:{type:String, required: "phone is required", unique: true},
  
});

module.exports = mongoose.model("employees", Employee)

