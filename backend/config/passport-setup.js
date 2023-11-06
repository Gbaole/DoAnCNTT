const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("../models/user");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET; // Your secret key

const connectPassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.CALL_BACK_URL,
      },
      (accessToken, refreshToken, profile, done) => {
        //check if user exists
        User.findOne({ passportId: profile.id }).then((currentUser) => {
          if (currentUser) {
            //user already exists
            console.log("User is:", currentUser);
            done(null, currentUser);
          } else {
            //if user not exists -> create new user
            new User({
              passportId: profile.id,
              displayName: profile.displayName,
            })
              .save()
              .then((newUser) => {
                console.log("User saved" + newUser);
                done(null, newUser);
              });
          }
        });
      }
    )
  );
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      // Check if the user exists in your database based on the JWT payload
      User.findById(jwt_payload.sub, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
};

module.exports = connectPassport;

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});
