const mongoose = require("mongoose");
const dateFormatUtility = require("../utils/dateFormat");

// Creating Schema for Reaction
const ReactionModelSchema = new mongoose.Schema(
  {
    reactionId: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormatUtility(createdAtVal),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// Creating Schema for Thought
const ThoughtModelSchema = new mongoose.Schema(
  {
    thoughtText: {
      type: String,
      required: "Thought is Required",
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormatUtility(createdAtVal),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [ReactionModelSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Virtual property for reaction count
ThoughtModelSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Creating Thought model using Thought schema
const Thought = mongoose.model("Thought", ThoughtModelSchema);

// Exporting Thought model
module.exports = Thought;
