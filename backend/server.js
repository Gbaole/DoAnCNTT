const app = require("./app");
const connectDatabase = require("./config/database");
const dotenv = require("dotenv");
const connectPassport = require("./config/passport-setup");
//Setup config file

dotenv.config({ path: "config/config.env" });

//Connect to database

connectDatabase();
connectPassport();
app.listen(process.env.PORT, () => {
  console.log(
    `Server listening on ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});
