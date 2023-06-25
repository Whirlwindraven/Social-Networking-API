const mongoose = require("mongoose");

const connectWithRetry = function() {
  return mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/social-network-api",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('MongoDB connection successful'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    console.log('Retrying in 5 seconds...');
    setTimeout(connectWithRetry, 5000);
  });
}

mongoose.set("debug", true);

connectWithRetry();

module.exports = mongoose.connection;
