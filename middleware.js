const iKjwt = require('jsonwebtoken')

//create and return jwt
exports.iKcreateJwt = iKuserId => {
    const iKjwtToken = iKjwt.sign({ id: iKuserId }, process.env.IKJWT_SECRET, {expiresIn: 600});
    return iKjwtToken
}


