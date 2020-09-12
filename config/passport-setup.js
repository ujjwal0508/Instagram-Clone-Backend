var passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
let keys = require('../config/keys')


passport.serializeUser((name, done) => {
    console.log('serialize');
    done(null, name);
});

passport.deserializeUser((id, done) => {
    console.log('deserialize');
    done(null, id);
});

passport.use(new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: '/auth/google/redirect'
},
    function (accessToken, refreshToken, profile, done) {

        console.log('inside passport callback function google')
        console.log(profile)

        done(null, profile.displayName);
    }
));