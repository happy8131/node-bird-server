const passport = require("passport");
const { User } = require("../models");
const local = require("./local");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id); //쿠키에 묶어 세션에 저장
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });
      done(null, user); // req.user로 보내준다
    } catch (err) {
      console.error(err);
      done(error);
    }
  });

  local();
};
