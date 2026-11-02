const jwt = require('jsonwebtoken')

function signtoken(user){
    const payload = {sub: String(user._id), role: user.role}
    return jwt.sign(payload, jwtSecret, {expiresIn: jwtExpiresIn})
}