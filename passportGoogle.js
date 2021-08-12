const iKgoogleStrategy      = require('passport-google-oauth20').Strategy;
const iKuserDb              = require('./model.js')

// Use the iKgoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
exports.iKgooglePassport = iKpassportP => {
    iKpassportP.use(new iKgoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:4000/api/google/redirect"
        },
        function(accessToken, refreshToken, profile, done) {
            console.log(222)
            console.log(profile)
            iKuserDb.find({ googleId: profile.id }, function (err, user) {
                if (err){ 
                    console.log(333); 
                    return done(err, false);
                }

                if (user.length == 0) {
                    console.log(profile.id); 
                    return done(null, false);
                } 
                
                console.log(111)
                console.log(user)
                return done(err, user);
            });
        }
    ));
}
