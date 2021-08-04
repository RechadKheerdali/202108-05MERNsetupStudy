const iKjwt = require('jsonwebtoken')


exports.iKcreateJwt = (iKid) => {
    return iKjwt.sign( {iKid}, 'iKsecret1', {expiresIn: 6000})
}

exports.iKauthenticateRoute = (req, res, next) => {
    const iKreqJwt = req.headers.authorization;
    const iKsplitJwt = iKreqJwt.split(' ')
    const iKjwtToken = iKsplitJwt[1]

    if (!req.headers.authorization) return res.send('iK no authorization header provided');

    iKjwt.verify( iKjwtToken, 'iKsecret1', (iKerr, iKuserId) => {
        if (!iKuserId) return res.send('iK jwt token not valid');
        next()
    } )
}




