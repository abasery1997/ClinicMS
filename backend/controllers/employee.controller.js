const { validationResult } = require("express-validator");
const Employee = require("../models/employee");


//get all Employees
exports.getAllEmployees = (req, res, next) => {
    Employee.find({})
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
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    let id = req.body.id;
    console.log(id);
    Employee.findById(id)
        .then(data => {
            console.log(data);
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
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    let birthDate = new Date(req.body.birthDate);
    let employee = new Employee({
        firstname: req.body.firstname,
        lastname:req.body.lastname,
        email: req.body.email,
        image:req.file.filename,
        password: req.body.password,
        gender: req.body.gender,
        birthDate: birthDate,
        phone:req.body.phone,
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
exports.updateEmployee = (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    let birthDate = new Date(req.body.birthDate);
    Employee.findByIdAndUpdate(req.body.id, {
        $set: {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            gender: req.body.gender,
            birthDate: birthDate,
            phone:req.body.phone,
            
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
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    let id = req.body.id;
    Employee.findByIdAndDelete(id)
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