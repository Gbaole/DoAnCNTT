const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_LOCAL_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'kala_webapp'
    })
    .then((con) => {
      console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
    });
};
module.exports = { connectDatabase };
