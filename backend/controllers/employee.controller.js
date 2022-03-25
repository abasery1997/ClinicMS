const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt")
const Employee = require("../models/employee");


//get all Employees
exports.getAllEmployees = (req, res, next) => {
    Employee.find({},{password:0,__v:0})
        .then(data => {
            res.status(200).json(data)

        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}

//get specific Employee 
exports.getAnEmployee = (req, res, next) => {
    const {_id}= req.body;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    Employee.findById(_id,{password:0,__v:0})
        .then(data => {
            if (data == null) {
                throw new Error("Employee not Found!")
            } else {
                res.status(200).json({ data })
            }
        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}
//add new Employee
exports.addEmployee = (req, res, next) => {
    const { firstname, lastname, password, email, gender, phone, } = req.body;
    let birthDate = new Date(req.body.birthDate);

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    let employee = new Employee({
        firstname,lastname,email,
        image:req.file.filename,
        password :bcrypt.hashSync(password, 10),
        gender,birthDate,phone
    });
    employee.save()
        .then(data => {
            res.status(201).json({ id: data._id })
        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })

}
//update employee
exports.updateEmployee =  (req, res, next) => {
    const {_id, firstname, lastname, password, email, gender, phone, } = req.body;
    let birthDate = new Date(req.body.birthDate);

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    Employee.findByIdAndUpdate(_id, {
        $set: {
            firstname,lastname,email,
            password :bcrypt.hashSync(password, 10),
            gender,birthDate,phone
        }
    })
        .then(data => {
            if (data == null) {
                throw new Error("Employee not Found!")
            } else {

                res.status(200).json({ message: "updated" })
            }

        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}

//delete Employee
exports.deleteEmployee = (req, res, next) => {
    const {_id}=req.body;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    Employee.findByIdAndDelete(_id)
        .then((data) => {
            if (data == null) {
                throw new Error("Employee not Found!")
            } else {
                res.status(200).json({ message: "deleted" })
            }
        })
        .catch(error => {
            error.status = 500;
            next(error.message);
        })
}