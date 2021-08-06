const iKexpress = require('express')
const iKmorgan = require('morgan')
// const iKpassport = require('passport')
const iKcors = require('cors')

const iKuserDb = require('./model.js')



require('dotenv').config()

const iKapp = iKexpress()
iKapp.use( iKmorgan('dev') )
iKapp.use( iKexpress.urlencoded({extended: true}) )
require('./database.js')()


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
    const email = req.body.email
    const password = req.body.password

    res.send( req.body )
})


iKapp.get('/api/login', (req, res) => {
    res.send('iK login page')
})


iKapp.post('/api/login', (req, res) => {
    res.send( req.body )
})


iKapp.post('/api/logout', (req, res) => {
    res.send( req.body )
})


iKapp.get('/api/authpage', (req, res) => {
    res.send('iK auth page')
})

const iKport = process.env.PORT || 4000;
iKapp.listen(iKport, () => console.log( 'iK server connection successfuly' ))



