var passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
let keys = require('../config/keys')

const util = require('util');
const db = require('../models/db')
const query = util.promisify(db.query).bind(db);

const User = require('../models/User');
const shortid = require('shortid');


passport.serializeUser((user, done) => {
    // console.log('serialize id ' + user.id);
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {

    let users = await query(`SELECT * from user where id = "${id}"`);

    // console.log('found user : ' + users);
    if (users.length !== 0)
        done(null, users[0]);
});

passport.use(new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: '/auth/google/redirect'
},
    async function (accessToken, refreshToken, profile, done) {

        // console.log(profile);
        let usersList = await query(`SELECT * from user where google_id = ${profile.id}`);
        let user;
        if (usersList.length === 0) {

            console.log('creating new user');
            const newUser = new User({
                name: profile.name.givenName,
                google_id: profile.id,
                email: profile.emails[0].value,
                is_verified: profile.emails[0].verified,
                handle: shortid.generate()
            });

            user = await User.createTemp(newUser);
        } else {
            user = usersList[0];
        }

        console.log(user);

        done(null, user);
    }
));