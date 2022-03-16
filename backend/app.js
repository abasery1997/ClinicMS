require("dotenv").config();
const express = require("express");
const body_parser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const corsOptions ={
  origin:'*',
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

const bodyParser = require('body-parser');

//routes
const doctorRoute = require('./routes/doctors.router')
// listing to server
const app = express();



mongoose.connect("mongodb://localhost:27017/ClinicMS")
  .then(() => {
    console.log("DB connected ....");

    // listen on port Number
    app.listen(process.env.PORT || 8080, () => {
      console.log(`listening to port 8080 `)
    });


  })
  .catch(error => {
    console.log(" DB Problem" + error)
  })



app.use(cors(corsOptions));
// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());



app.use('/doctors',doctorRoute);

//unknown paths
app.use((req, res, next) => {
  res.status(404).json({ message: " unknown url paths" });

});
//error
app.use((error, req, res, next) => {
  res.status(500).json({ error });

})

