const mongoose = require("mongoose");


Admin = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });

  module.exports = mongoose.model("admin", Admin)
