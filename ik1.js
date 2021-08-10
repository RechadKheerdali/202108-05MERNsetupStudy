/**
 * iK I did not complete becuase I still need to compare user password / sort out logout of user
 * -    Other things I have not done is mostly error handling and small tedious task
 * -    However despite the uncompleted task, this rest api works quites well you can use as reference if you ever need to
 */

const iKexpress = require('express')
const iKmorgan = require('morgan')
const iKcors = require('cors')
const iKsession = require('express-session')
const iKmongoStore = require('connect-mongo');


const iKpassport = require('passport')
// const {iKpassportJwt} = require('./passport_jwt.js')
const {iKpassportLocal, iKpassportSerializeUser, iKpassportDeserailizeUser} = require('./passport_local.js')

require('dotenv').config()
const iKuserDb = require('./model.js')
const {iKcreateJwt} = require('./middleware.js')




const iKapp = iKexpress()
iKapp.use( iKmorgan('dev') )
iKapp.use( iKexpress.urlencoded({extended: true}) )
iKapp.use( iKexpress.json() )
// require('./database.js')()


//whtielist
const iKcorsOptions = {
    origin: 'http://localhost:9000'
    // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
iKapp.use( iKcors(iKcorsOptions) )

iKapp.use(iKsession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
    // cookie: { secure: true },
    ,store: iKmongoStore.create({ 
        mongoUrl: process.env.IKMONGODBURI,
        mongooseConnection: require('./database.js')(), // mongoose app connection too
        connection: 'sessions'
    })
    , cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: false
    }
  }))


iKapp.use(iKpassport.initialize());
iKapp.use(iKpassport.session());

// iKpassport.use(iKpassportJwt)
iKpassport.use(iKpassportLocal);
// iKapp.use( iKpassportSerializeUser(iKpassport) )
iKpassport.serializeUser(function(user, done) {
    console.log(44)
    console.log(user)
    done(null, user.id);
})

// iKapp.use( iKpassportDeserailizeUser(iKpassport) )
iKpassport.deserializeUser(async function(id, done) {
    console.log(66)
    await iKuserDb.findById(id, function(err, user) {
        console.log(55)
        console.log(user)
        return done(err, user);
    })
})


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

//iK backup when you are done
// iKapp.post('/api/login', iKpassport.authenticate('local', { session: false }), (req, res) => {

iKapp.post('/api/login', iKpassport.authenticate('local'), (req, res) => {
    //req.user is provided by the use of passport.js
    const iKjwtToken = iKcreateJwt( req.user.id )
    console.log(77)
    console.log(req.session)
    console.log(req.user)
    console.log(req.isAuthenticated())

    res.json({ iKuser: req.user, iKjwtToken, iKcookie: req.session })
})


iKapp.post('/api/logout', (req, res) => {
    res.send( req.body )
})


iKapp.get('/api/authpage', (req, res) => {
    console.log(88)
    console.log(req.session)
    console.log(req.user)
    console.log(req.isAuthenticated())
    res.send('iK auth page')
})


const iKport = process.env.PORT || 4000;
iKapp.listen(iKport, () => console.log( `iK server connection successfuly ${iKport}` ))



/**
 * focused on the /signup route first by returning a jwt (with any jwt library) when user sucessfully signup   >>>   Use of passport-jwt to authenticate the incoming request authorization containing jwt for protected routes   >>>   When passport-jwt is set up, you than place iKpassport.authenticate('jwt', { session: false }) middleware on all protected   >>>   Now focus on /login route by setting up passport-local   >>>   When passport-local is set up, place iKpassport.authenticate('local', { session: false }) middleware on /login route only   >>>   The /login route should return user data and a fresh jwt
 * 
 */