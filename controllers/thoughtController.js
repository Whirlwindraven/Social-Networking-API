// Import the Thought and User models from "../models"
const { Thought, User } = require("../models");

const handleError = (err, res) => {
  console.log(err);
  res.sendStatus(400);
};

const handleThoughtNotFound = (dbThoughtData, res) => {
  if (!dbThoughtData) {
    return res.status(404).json({ message: "No thought with this id!" });
  }
};

const thoughtController = {
  // Get all thoughts
  getAllThoughts: (req, res) => {
    Thought.find({})
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => handleError(err, res));
  },

  // Get one thought by id
  getThoughtById: ({ params }, res) => {
    Thought.findOne({ _id: params.id })
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .then((dbThoughtData) => {
        handleThoughtNotFound(dbThoughtData, res);
        res.json(dbThoughtData);
      })
      .catch((err) => handleError(err, res));
  },

  // Create thought
  createThought: ({ params, body }, res) => {
    Thought.create(body)
      .then((dbThoughtData) => 
        User.findOneAndUpdate(
          { username: dbThoughtData.username },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        )
      )
      .then((dbUserData) => {
        console.log(dbUserData);
        if (!dbUserData) {
          return res.status(404).json({ message: "Thought created but no user with this id!" });
        }

        res.json({ message: "Thought successfully created!" });
      })
      .catch((err) => res.json(err));
  },

  // Update thought by id
  updateThought: ({ params, body }, res) => {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
    .then((dbThoughtData) => {
      handleThoughtNotFound(dbThoughtData, res);
      res.json(dbThoughtData);
    })
    .catch((err) => res.json(err));
  },

  // Delete thought
  deleteThought: ({ params }, res) => {
    Thought.findOneAndDelete({ _id: params.id })
    .then((dbThoughtData) => {
      handleThoughtNotFound(dbThoughtData, res);

      return User.findOneAndUpdate(
        { thoughts: params.id },
        { $pull: { thoughts: params.id } },
        { new: true }
      );
    })
    .then((dbUserData) => {
      if (!dbUserData) {
        return res.status(404).json({ message: "Thought created but no user with this id!" });
      }
      res.json({ message: "Thought successfully deleted!" });
    })
    .catch((err) => res.json(err));
  },

  // Add reaction
  addReaction: ({ params, body }, res) => {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true, runValidators: true }
    )
    .then((dbThoughtData) => {
      handleThoughtNotFound(dbThoughtData, res);
      res.json(dbThoughtData);
    })
    .catch((err) => res.json(err));
  },

  // Delete reaction
  removeReaction: ({ params }, res) => {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
    .then((dbThoughtData) => res.json(dbThoughtData))
    .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
