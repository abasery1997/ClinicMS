const express = require("express");
const router = express.Router();
const { body } = require("express-validator")

const { login } = require("../controllers/auth.controller");


router.post('', [
    body("email").isEmail().withMessage("email format not correct"),
    body("password").isString().withMessage("password shouldn't be empty"),
    //a->admin//d->doctor/e->employee/p->patient
    body("type").isIn(['a', 'd', 'e', 'p']).withMessage("type should be a, d, e, or ,p"),
], login);

module.exports = router;

