/**
 * iK I did not complete becuase I still need to compare user password / sort out logout of user
 * -    Other things I have not done is mostly error handling and small tedious task
 * -    However despite the uncompleted task, this rest api works quites well you can use as reference if you ever need to
 */

const iKexpress = require('express')
const iKmorgan = require('morgan')
const iKcors = require('cors')

const iKpassport = require('passport')
const {iKpassportJwt} = require('./passport_jwt.js')
const {iKpassportLocal} = require('./passport_local.js')

require('dotenv').config()
const iKuserDb = require('./model.js')
const {iKcreateJwt} = require('./middleware.js')




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

iKapp.use(iKpassport.initialize());
iKpassport.use(iKpassportJwt)
iKpassport.use(iKpassportLocal)

//routes
iKapp.get('/', (req, res) => {
    res.send('iK home page1')
})


iKapp.get('/api/signup', (req, res) => {
    res.send('iK signup page')
})


iKapp.post('/api/signup', async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    //save new user onto db
    //ideally you would need to check if user already exist
    await iKuserDb({iKemail: email, iKpassword: password}).save()
        .then(iKuser => {

            const iKjwtToken = iKcreateJwt( iKuser.id )

            return res.json({ iKuser, iKjwtToken })
        })

    // res.send( 'iK error occured in saving new user' )
})


iKapp.get('/api/login', (req, res) => {
    res.send('iK login page')
})


iKapp.post('/api/login', iKpassport.authenticate('local', { session: false }), (req, res) => {
    //req.user is provided by the use of passport.js
    const iKjwtToken = iKcreateJwt( req.user.id )

    res.json({ iKuser: req.user, iKjwtToken })
})


iKapp.post('/api/logout', (req, res) => {
    res.send( req.body )
})


iKapp.get('/api/authpage', iKpassport.authenticate('jwt', { session: false }), (req, res) => {
    res.send('iK auth page')
})


const iKport = process.env.PORT || 4000;
iKapp.listen(iKport, () => console.log( 'iK server connection successfuly' ))



/**
 * focused on the /signup route first by returning a jwt (with any jwt library) when user sucessfully signup   >>>   Use of passport-jwt to authenticate the incoming request authorization containing jwt for protected routes   >>>   When passport-jwt is set up, you than place iKpassport.authenticate('jwt', { session: false }) middleware on all protected   >>>   Now focus on /login route by setting up passport-local   >>>   When passport-local is set up, place iKpassport.authenticate('local', { session: false }) middleware on /login route only   >>>   The /login route should return user data and a fresh jwt
 * 
 */