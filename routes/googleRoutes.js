const express = require("express");
const router = express.Router();
const passport = require("passport");

// @desc Auth with google
//@route GET /auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

//@desc Google auth callback
//@route GET /auth/google/callback

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/api/v1/" }),
  (req, res) => {
    res.redirect("/api/v1/dashboard");
  }
);

//@desc Logout user
//@route /auth/logout
router.get("/logout", (req, res, done) => {
  req.logout((err)=> {
    if(err){
      return done(error);
    }
    res.redirect("/api/v1/");
  });

});
module.exports = router;
