const mongoose = require('mongoose');
const db = require('./config/connection');

const User = require('./models/User');
const Post = require('./models/Post');

// Connect to the database
db;

// Define your seed data
const users = [
  {
    name: 'John Doe',
    email: 'john@example.com'
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com'
  }
];

const posts = [
  {
    title: 'First Post',
    content: 'This is the first post.',
    author: null // We'll set this later
  },
  {
    title: 'Second Post',
    content: 'This is the second post.',
    author: null // We'll set this later
  }
];

// This function will run your seed script
async function seedDB() {
  try {
    // First clear the database
    await User.deleteMany({});
    await Post.deleteMany({});

    // Save the users
    const createdUsers = await User.insertMany(users);

    // Associate the first post with the first user and the second post with the second user
    posts[0].author = createdUsers[0]._id;
    posts[1].author = createdUsers[1]._id;

    // Save the posts
    await Post.insertMany(posts);

    console.log('Database seeded!');
  } catch (err) {
    console.error(err);
  } finally {
    // Close the connection to the db
    mongoose.connection.close();
  }
}

// Call the seedDB function
seedDB();
