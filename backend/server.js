'use strict';
const { envPath, connectDatabase } = require('./config');
const dotenv = require('dotenv');
// const bodyParser = require('body-parser');

//Setting up config file
dotenv.config({ path: envPath });

const express = require('express');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/errors');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const cloudinary = require('cloudinary').v2;
// Cloudinary Configuration
// cloudinary.config({  //tmc cloudinary
//   cloud_name: 'dkfkzasms',
//   api_key: '142388195662354',
//   api_secret: 'xD9NTwAoySkTp8rvHSnI1H1N7NY'
// });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();

// app.use(
//   bodyParser.urlencoded({
//     extended: true
//   })
// );
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      `https://${process.env.FRONTEND_DOMAIN}`
    ],
    credentials: true,
    exposedHeaders: ['set-cookie']
  })
);

app.use(express.json());
app.use(fileUpload());
app.use(express.static('public'));
app.use(cookieParser());
app.use(morgan('dev'));

// app.use((req, res, next) => {
//   if (process.env.NODE_ENV == 'dev') {
//     setTimeout(() => {
//       next();
//     }, 500);
//   }
// });

//Import all routes
const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');
const misc = require('./routes/misc');
const admin = require('./routes/admin');
const news = require('./routes/news');
const customers = require('./routes/customers');
const ui = require('./routes/ui');

app.use('/v1', auth);
app.use('/v1', order);
app.use('/v1', misc);
app.use('/v1', admin);
app.use('/v1', products);
app.use('/v1', news);
app.use('/v1', customers);
app.use('/v1', ui);
//Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;

//Handle Uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.stack}`);
  console.log('Shut down the server due to Uncaught Exception');
  process.exit(1);
});

//Connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode. `);
});

//Handle Unhandled Promise rejection
process.on('unhandledRejection', (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log('Shut down the server due to unhandled Promise rejection');
  server.close(() => {
    process.exit(1);
  });
});

//add the Access-Control-Allow-Origin header to the response object

// app.post('/api/v1/login', (req, res) => {
//   // authenticate user and generate JWT token

//   const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, process.env.JWT_EXPIRES_TIME);

//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.json({ token });
// });
