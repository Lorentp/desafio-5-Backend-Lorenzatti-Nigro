const passport = require("passport");
const local = require("passport-local");
const UsersModel = require("../dao/models/users.model");
const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, done) => {
        const { first_name, last_name, email, age, password } = req.body;
        try {
          let user = await UsersModel.findOne({ email });
          if (user) return done(null, false);
          let newUser = {
            first_name,
            last_name,
            email,
            age,
            password,
          };

          let result = await UsersModel.create(newUser);
          return done(null, result);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (email, password, done) => {
        try {
          const user = await UsersModel.findOne({ email });
          if (!user) {
            console.log("Usuario inexistente");
            return done(null, false);
          }

          if (password) return done(null, false);
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await UsersModel.findById({ _id: id });
    done(null, user);
  });
};

module.exports = initializePassport;
