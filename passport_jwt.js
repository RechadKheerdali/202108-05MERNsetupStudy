const  JwtStrategy = require('passport-jwt').Strategy,
        ExtractJwt = require('passport-jwt').ExtractJwt;

require('dotenv').config()
const iKuserDb = require('./model.js')


        
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.IKJWT_SECRET
}

exports.iKpassportJwt = new JwtStrategy(opts,  function(jwt_payload, done) {
    iKuserDb.findOne({_id: jwt_payload.id}, function(err, iKuser) {
        if (err) {
            return done(err, false);
        }
        if (iKuser) {
            return done(null, iKuser);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
});