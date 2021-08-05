const iKjwt = require('jsonwebtoken')


exports.iKcreateJwt = (iKid) => {
    return iKjwt.sign( {iKid}, 'iKsecret1', {expiresIn: 6000})
}

//iK it works, but ideally check out my iKisLoggedOut value and further authenticate it from there
exports.iKauthenticateRoute = (req, res, next) => {
    if (!req.headers.authorization) return res.send('iK no authorization header provided');

    const iKreqJwt = req.headers.authorization;
    const iKsplitJwt = iKreqJwt.split(' ')
    const iKjwtToken = iKsplitJwt[1]

    iKjwt.verify( iKjwtToken, 'iKsecret1', (iKerr, iKuserId) => {
        if (!iKuserId) return res.send('iK jwt token not valid');
        req.iKuserId = iKuserId;
        next()
    } )
}




