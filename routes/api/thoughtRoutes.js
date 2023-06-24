const express = require("express");
const thoughtController = require("../../controllers/thoughtController");
const router = express.Router();

// api/thoughts
router.get("/", thoughtController.getAllThoughts);
router.post("/", thoughtController.createThought);

// /api/thoughts/:id
router.route("/:id")
  .get(thoughtController.getThoughtById)
  .put(thoughtController.updateThought)
  .delete(thoughtController.deleteThought);

// /api/thoughts/:thoughtId/reactions
router.post("/:thoughtId/reactions", thoughtController.addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.delete("/:thoughtId/reactions/:reactionId", thoughtController.removeReaction);

module.exports = router;
