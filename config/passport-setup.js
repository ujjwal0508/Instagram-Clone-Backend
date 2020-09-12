var passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
let keys = require('../config/keys')


passport.serializeUser((profile, done) => {
    console.log('serialize');
    // console.log(profile)
    done(null, profile);
});

passport.deserializeUser((profile, done) => {
    console.log('deserialize abcd');
    // console.log(profile);
    done(null, profile);
});

passport.use(new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: '/auth/google/redirect'
},
    function (accessToken, refreshToken, profile, done) {

        console.log('inside passport callback function google')
        // console.log(profile)

        done(null, profile);
    }
));