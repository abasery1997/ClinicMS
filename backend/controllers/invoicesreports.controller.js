const Appointment = require("../models/appointment");
const Doctor = require("../models/doctors");
const Employee = require("../models/employee");
const Patient = require("../models/patient");
const ClinicService = require("../models/ClinicService");


exports.getInovoicesReport = (req, res, next) => {

    let respones = [];

    // })
    async function getInovoicesReport() {
        const appData = await Appointment.find({},{__v:0});
        let i = 0;
        for (const element of JSON.parse(JSON.stringify(appData))) {
            respones.push(element);
            const docData = await Doctor.findById(element.doctorID);
            const empData = await Employee.findById(element.employeeID);
            const patData = await Patient.findById(element.patientID);
            console.log(docData);
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
    getInovoicesReport().then((data) => {
        res.status(200).json(data);
    })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })

}