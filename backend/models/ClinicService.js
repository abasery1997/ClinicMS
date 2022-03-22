const mongoose = require("mongoose");

const ClinicService = new mongoose.Schema({
    name: { type: String, required: "clinic service name is required", unique: true},
    invoiceAmount : { type: Number, required: "InvoiceAmount is required" },
   
  
});

module.exports = mongoose.model("clinicServices", ClinicService)

