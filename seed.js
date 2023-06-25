const mongoose = require('mongoose');
const User = require('./models/User');
const Thought = require('./models/Thought');

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/social-network-api",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Defining a list of users
const users = [
  {
    username: 'seedUser1',
    email: 'seeduser1@example.com',
    // add other fields as per your User schema
  },
  {
    username: 'seedUser2',
    email: 'seeduser2@example.com',
    // add other fields as per your User schema
  },
  // add more users if needed
];

// Defining a list of thoughts
const thoughts = [
  {
    thoughtText: "This is a seed thought from seedUser1",
    username: 'seedUser1',
    // add other fields as per your Thought schema
  },
  {
    thoughtText: "This is a seed thought from seedUser2",
    username: 'seedUser2',
    // add other fields as per your Thought schema
  },
  // add more thoughts if needed
];

// Function to seed the users and thoughts
const insertData = async () => {
  await User.insertMany(users);
  await Thought.insertMany(thoughts);

  console.log("Data Inserted Successfully");
  process.exit(0);
};

insertData();
