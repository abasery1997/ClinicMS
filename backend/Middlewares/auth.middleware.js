
const jwt = require('jsonwebtoken')

exports.AuthRequired = (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) return res.status(401).json({ msg: "Invalid Token" })
        const token = authorization.split(' ')[1]
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