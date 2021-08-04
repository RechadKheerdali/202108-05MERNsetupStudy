const iKexpress = require('express')
const iKmorgan = require('morgan')
const iKpassport = require('passport')


const iKapp = iKexpress()
iKapp.use( iKmorgan('dev') )
iKapp.use( iKexpress.urlencoded({extended: true}) )
require('./database.js')()

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

iKapp.get('/api/authpage', (req, res) => {
    res.send('iK auth page')
})

iKapp.listen(4000, () => console.log( 'iK server connection successfuly' ))



