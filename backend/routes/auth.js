const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.get("/login", (req, res) => {
  res.render("login");
  if (credentialsValid) {
    // User is authenticated, create a JWT
    const payload = {
      sub: user._id, // User ID
      // You can add more user data to the payload if needed
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expiration time (adjust as needed)
    });

    res.json({ token });
  } else {
    // Return an error if login fails
    res.status(401).json({ message: "Authentication failed" });
  }
});

module.exports = router;

router.get("/logout", (req, res) => {
  //Handle with passportjs
  res.send("logout");
});

//auth with google

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

// callback route for google to redirect to
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.send("you reached the redirect URI");
});

module.exports = router;
