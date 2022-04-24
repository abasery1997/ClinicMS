const jwt = require('jsonwebtoken')

exports.AuthRequired = (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        console.log(authorization);
        if (!authorization) return res.status(401).json({ msg: "Invalid Token" })
        const token = authorization
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = user
        console.log(user.type);
        next()
    } catch (err) {
        res.status(403).json({ msg: "Invalid Token", err: err })
    }
}

exports.notAuthRequired = (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (authorization) return res.status(403).json({ msg: "Invalid Path" })
        else
            next()
    } catch (err) {
        res.status(403).json({ msg: "Invalid Path", err: err })
    }
}

exports.AdminAuthRequired = (req, res, next) => {
    try {
        if(req.user.type != 'a') return res.status(401).json({ msg: "Invalid Token" })
        next()
    } catch (err) {
        res.status(403).json({ msg: "Invalid Token", err: err })
    }
}

exports.DoctorAuthRequired = (req, res, next) => {
    try {
        if(req.user.type != 'd') return res.status(401).json({ msg: "Invalid Token" })
        next()
    } catch (err) {
        res.status(403).json({ msg: "Invalid Token", err: err })
    }
}

exports.EmpAuthRequired = (req, res, next) => {
    try {
        if(req.user.type != 'e') return res.status(401).json({ msg: "Invalid Token" })
        next()
    } catch (err) {
        res.status(403).json({ msg: "Invalid Token", err: err })
    }
}

exports.PatientAuthRequired = (req, res, next) => {
    try {
        if(req.user.type != 'p') return res.status(401).json({ msg: "Invalid Token" })
        next()
    } catch (err) {
        res.status(403).json({ msg: "Invalid Token", err: err })
    }
}