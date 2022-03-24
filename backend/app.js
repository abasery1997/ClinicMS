require("dotenv").config();
const express = require("express");
const body_parser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const multer=require("multer");
const bodyParser = require('body-parser');
const  path=require("path");



//routes
const authRouter = require('./routes/auth.router')
const prescriptionRouter = require('./routes/prescription.router')
const doctorRoute = require('./routes/doctors.router')
const employeeRoute = require('./routes/employee.router')
const patientRoute = require('./routes/patient.router')
const ClinicService = require('./routes/ClinicService.router')
const appointmentRouter = require('./routes/appointment.router')

const corsOptions ={
  origin:'*',
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}
//image variables
const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
      console.log(path.join(__dirname,"images"));
      cb(null,path.join(__dirname,"images"))
  },
  filename:(req,file,cb)=>{
      cb(null,new Date().toLocaleDateString().replace(/\//g,"-")+"-"+file.originalname)
  }
})
const fileFilter=(req,file,cb)=>{
  if(file.mimetype=="image/jpeg"||
     file.mimetype=="image/jpg"||
     file.mimetype=="image/png")
     cb(null,true)
  else
  cb(null,false)
}


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
app.use("/images",express.static(path.join(__dirname,"images")));
app.use(multer({storage,fileFilter}).single("image"));



app.use((req,res,next)=>{
if (req.hasOwnProperty('file')){

  if (req.file.filename!=null){
    let temp = req.file.filename;
    req.file.filename=`http://localhost:8080/images/${temp}`;
  }

}
next();

});

app.use((req,res,next)=>{
  if (req.hasOwnProperty('birthDate')){
  
    if (req.body.birthDate!=null){
     let temp = req.body.birthDate;
      req.body.birthDate=Date(temp);
    }
  }
  if (req.hasOwnProperty('appDate')){
  
    if (req.body.appDate!=null){
     let temp = req.body.appDate;
      req.body.appDate=Date(temp);
    }
  }
  next();  
  });
  
app.use('/login',authRouter);
app.use('/doctors',doctorRoute);
app.use('/employees',employeeRoute);
app.use('/patients',patientRoute);
app.use('/clinicservice',ClinicService);
app.use('/appointments',appointmentRouter);
app.use('/prescriptions',prescriptionRouter);

//unknown paths
app.use((req, res, next) => {
  res.status(404).json({ message: " unknown url paths" });

});
//error
app.use((error, req, res, next) => {
  res.status(500).json({ error });

})

