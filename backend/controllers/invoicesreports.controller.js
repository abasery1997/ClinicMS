const Appointment = require("../models/appointment");
const Doctor = require("../models/doctors");
const Employee = require("../models/employee");
const Patient = require("../models/patient");
const ClinicService = require("../models/ClinicService");

const { getAppointments } = require("./appointment.controller")
const { getADoctor } = require('./doctors.controller')
const { getAPatient } = require('./patient.controller')
const { getAnEmployee } = require('./employee.controller');
const { json } = require("express/lib/response");

exports.getInovoicesReport = (req, res, next) => {
    // Appointment.find().forEach(()=>{

    let respones = [];

    // })
    async function test() {
        const appData = await Appointment.find({});
        let i = 0;
        for (const element of JSON.parse(JSON.stringify(appData))) {
            respones.push(element);
            const docData = await Doctor.findById(element.doctorID);
            const empData = await Employee.findById(element.employeeID);
            const patData = await Patient.findById(element.patientID);
            const clinicServiceData = await ClinicService.findById(docData.clinicServiceID);
            respones[i]['doctorFirstName'] = docData.firstname;
            respones[i]['doctorLastName'] = docData.lastname;
            respones[i]['clinicServiceName'] = clinicServiceData.name;
            respones[i]['clinicServiceAmount'] = clinicServiceData.invoiceAmount;
            respones[i]['employeeFirstName'] = empData.firstname;
            respones[i]['employeeLastName'] = empData.lastname;
            respones[i]['patientFirstName'] = patData.firstname;
            respones[i]['patientLastName'] = patData.lastname;
            
            i++;
            console.log(respones);
        }
        return respones;
    }
        test().then((data)=>{
            res.status(200).json(data);
        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })

}