const express = require("express");
const app = express();
const passportSetup = require("./config/passport-setup");
const session = require("express-session");

app.use(express.json());
app.set("view engine", "ejs");

app.use(
  session({
    secret: "AAAAAAAAAA", // Change this to a secret key
    resave: false,
    saveUninitialized: false,
    // You can configure other options as needed
  })
);

app.get("/", (req, res) => {
  res.render("home");
});

//Route import
const products = require("./routes/product");
const auth = require("./routes/auth");

app.use("/api/v1", products);
app.use("/auth", auth);

module.exports = app;
