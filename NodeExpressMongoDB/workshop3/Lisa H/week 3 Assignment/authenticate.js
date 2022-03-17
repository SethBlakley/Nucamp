
// Require the passport middleware
const passport = require('passport');

// Require the localstrategy
const LocalStrategy = require('passport-local').Strategy;

// Require the user model
const User = require('./models/user');

// Import JWT strategy constructor
const JwtStrategy = require('passport-jwt').Strategy;

// Require another module .ExtractJwt, object that provides with several helper methods, one of them used to extract jw token from a request object
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

// Import config file
const config = require('./config.js');

// passport.use method is how we add the specific strategy plugin we want to use to our passport implementation. Create a new instance of local strategy and pass that in. The local strategy instance requires a verify callback function. A function that will verify the username and password against the locally stored username and passwords - use the authenticate method provided by the passport local mongoose plugin, which is a method on the user model and call that function User.authenticate()
exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// inside the function we'll return a token created by the jwt .sign method
exports.getToken = function (user) {
    return jwt.sign(user, config.secretKey, { expiresIn: 3600 }); // .sign method part of the jwt Api, will take the user object that was passed in as the first argument, 2nd argument will be the secret key string from the config model 
}; //3600 second (1 hour) to test

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(
    new JwtStrategy(
        opts,
        (jwt_payload, done) => {
            console.log('JWT payload:', jwt_payload);
            User.findOne({ _id: jwt_payload._id }, (err, user) => {
                if (err) {
                    return done(err, false);
                } else if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        }
    )
);

exports.verifyUser = passport.authenticate('jwt', { session: false });

// Set up the verifyAdmin() middleware
// Create and export a new function named verifyAdmin() 

exports.verifyAdmin = function (req, res, next) {
    if (req.user.admin === true) {
        return next();
    } else {
        const err = new Error('You are not authorized to perform this operation!');
        err.status = 403;
        return next(err);
    }
};
