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

iKapp.get('/login', (req, res) => {
    res.send('iK login page')
})

iKapp.post('/login', (req, res) => {
    res.send( req.body )
})

iKapp.get('/auth', (req, res) => {
    res.send('iK auth page')
})

iKapp.listen(4000, () => console.log( 'iK server connection successfuly' ))



