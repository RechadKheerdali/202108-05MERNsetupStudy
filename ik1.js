const iKexpress = require('express')
const iKmorgan = require('morgan')
const iKpassport = require('passport')
const {iKgooglePassport} = require('./passportGoogle.js')
const iKcors = require('cors')


require('dotenv').config()

const iKapp = iKexpress()
iKapp.use( iKmorgan('dev') )
iKapp.use( iKexpress.urlencoded({extended: true}) )
require('./database.js')()

iKapp.use(iKpassport.initialize());
iKgooglePassport(iKpassport)

//whtielist
const iKcorsOptions = {
    origin: 'http://localhost:9000'
    // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
iKapp.use( iKcors(iKcorsOptions) )


//routes
iKapp.get('/', (req, res) => {
    res.send('iK home page1')
})


iKapp.get('/api/signup', (req, res) => {
    res.send('iK signup page')
})


iKapp.post('/api/signup', (req, res) => {
    res.send( req.body )
})


iKapp.get('/api/login', (req, res) => {
    res.send('iK login page')
})


iKapp.post('/api/login', (req, res) => {
    res.send( req.body )
})


iKapp.get('/api/google', iKpassport.authenticate('google', { scope: ['profile'], session: false }), (req, res) => {
    res.send('iK google login page')
})


iKapp.get('/api/google/redirect', iKpassport.authenticate('google', {session: false}), (req, res) => {
    res.send('iK google redirect callback')
})


iKapp.get('/api/authpage', (req, res) => {
    res.send('iK auth page')
})


iKapp.post('/api/logout', (req, res) => {
    res.send( req.body )
})

const iKport = process.env.PORT || 4000;
iKapp.listen(iKport, () => console.log( 'iK server connection successfuly' ))



