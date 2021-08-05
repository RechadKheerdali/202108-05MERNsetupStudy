const iKexpress = require('express')
const iKmorgan = require('morgan')
// const iKpassport = require('passport')

require('dotenv').config()

const iKapp = iKexpress()
iKapp.use( iKmorgan('dev') )
iKapp.use( iKexpress.urlencoded({extended: true}) )
require('./database.js')()

const iKuserDb = require('./model.js')
const {iKcreateJwt, iKauthenticateRoute} = require('./iKmiddleware.js')
const iKbcrypt = require('bcrypt')


iKapp.get('/', (req, res) => {
    res.send('iK home page1')
})


iKapp.get('/api/signup', (req, res) => {
    res.send('iK signup page')
})

iKapp.post('/api/signup', (req, res) => {
    const iKuser = iKuserDb({
        iKemail: req.body.email,
        iKpassword: req.body.password,
        iKisLoggedOut: false
    })

    iKuser.save()
        .then(iKuserData => {
            const iKtoken = iKcreateJwt( iKuserData.id )
            res.json( {iKuserData, iKjwt: iKtoken} )
        })
})


iKapp.get('/api/login', (req, res) => {
    res.send('iK login page')
})

iKapp.post('/api/login', (req, res) => {
    const iKuserEmail = req.body.email
    const iKuserPassword = req.body.password

    iKuserDb.findOne({ iKemail: iKuserEmail })
        .then(iKuserData => {
            // console.log(iKuserData)
            if (iKuserData === null) res.send('iKcannot find email');

            iKbcrypt.compare(iKuserPassword, iKuserData.iKpassword).then(async function(result) {
                if (!result) return res.send('iK password not matching');
                
                const iKtoken = iKcreateJwt( iKuserData.id )
                res.json( {iKuserData, iKjwt: iKtoken} )
            });
        })
})


//iK did not finish like I want but I have confidence it will work accordingly if I had finish it
iKapp.post('/api/logout', iKauthenticateRoute, (req, res) => {
    //Not finish
    iKuserDb.iKlogoutUser( req.iKuserId )
    res.send('iK logout page')
})


iKapp.get('/api/authpage', iKauthenticateRoute, (req, res) => {
    res.send('iK auth page')
})


iKapp.listen(4000, () => console.log( 'iK server connection successfuly' ))