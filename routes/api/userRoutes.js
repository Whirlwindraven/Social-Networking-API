const express = require("express");
const userController = require("../../controllers/userController");
const router = express.Router();

// /api/users
router.get("/", userController.getAllUser);
router.post("/", userController.createUser);

// /api/users/:id
router.route("/:id")
  .get(userController.getUserById)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId")
  .post(userController.addFriend)
  .delete(userController.removeFriend);

module.exports = router;
