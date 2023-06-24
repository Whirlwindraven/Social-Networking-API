const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for User
const UserModelSchema = new Schema(
  {
    username: {
      type: String,
      required: "Username is Required",
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: "Email is Required",
      unique: true,
      match: [/.+@.+\..+/],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    // JSON configuration to include virtuals
    toJSON: {
      virtuals: true,
    },
    // Prevents virtuals from creating an "id" field
    id: false,
  }
);

// Virtual property for friend count
UserModelSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Creating User model with User schema
const User = mongoose.model("User", UserModelSchema);

// Export User model
module.exports = User;
