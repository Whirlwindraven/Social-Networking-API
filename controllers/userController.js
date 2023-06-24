// Import the User and Thought models
const { User, Thought } = require("../models");

const handleError = (err, res) => {
  console.log(err);
  res.sendStatus(400);
};

const handleUserNotFound = (dbUserData, res) => {
  if (!dbUserData) {
    return res.status(404).json({ message: "No user found with this id!" });
  }
};

const userController = {
  // Get all users
  getAllUser: (req, res) => {
    User.find({})
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => handleError(err, res));
  },

  // Get one user by id
  getUserById: ({ params }, res) => {
    User.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUserData) => {
        handleUserNotFound(dbUserData, res);
        res.json(dbUserData);
      })
      .catch((err) => handleError(err, res));
  },

  // Create user
  createUser: ({ body }, res) => {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },

  // Update user by id
  updateUser: ({ params, body }, res) => {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
    .then((dbUserData) => {
      handleUserNotFound(dbUserData, res);
      res.json(dbUserData);
    })
    .catch((err) => res.json(err));
  },

  // Delete a user
  deleteUser: ({ params }, res) => {
    User.findOneAndDelete({ _id: params.id })
    .then((dbUserData) => {
      handleUserNotFound(dbUserData, res);

      return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
    })
    .then(() => {
      res.json({ message: "User and associated thoughts deleted!" });
    })
    .catch((err) => res.json(err));
  },

  // Add a friend
  addFriend: ({ params }, res) => {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
    .then((dbUserData) => {
      handleUserNotFound(dbUserData, res);
      res.json(dbUserData);
    })
    .catch((err) => res.json(err));
  },

  // Delete a friend
  removeFriend: ({ params }, res) => {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
    .then((dbUserData) => {
      handleUserNotFound(dbUserData, res);
      res.json(dbUserData);
    })
    .catch((err) => res.json(err));
  },
};

module.exports = userController;