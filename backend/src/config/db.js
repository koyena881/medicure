const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Warning: ${error.message}`);
    console.log(`The server will continue to run with mock data until MongoDB is available.`);
    // process.exit(1); // Disabled to make the backend workable out-of-the-box
  }
};

module.exports = connectDB;
