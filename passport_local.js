const LocalStrategy = require('passport-local').Strategy;

const iKuserDb = require('./model.js')


exports.iKpassportLocal = new LocalStrategy(
    {usernameField: 'email'},
    function(email, password, done) {
        iKuserDb.findOne({ iKemail: email }, function(err, iKuser) {
            if (err) { return done(err); }
            if (!iKuser) {
                return done(null, false, { message: 'Incorrect email.' });
            }
            
            //iK You should compare user password with the hashword first

            return done(null, iKuser);
        });
    }
);