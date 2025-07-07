/**
 * @fileoverview Express router for comment-related API endpoints.
 * 
 * Endpoints:
 *   GET /api/comments
 *     - Fetch all comments.
 *     - Populates the 'user' field with the user's username.
 *     - Response: Array of comment objects.
 *     - Errors: 500 Internal Server Error if fetching fails.
 * 
 *   DELETE /api/comments/:id
 *     - Delete a comment by its ID.
 *     - Response: Success message if deleted, 404 if not found.
 *     - Errors: 500 Internal Server Error if deletion fails.
 * 
 * Usage:
 *   Mount this router at /api/comments in your Express app.
 * 
 * Example:
 *   const commentsRouter = require('./routes/api/comments');
 *
 */

const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find().populate("user", "username");
    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// add another endpoint for deleting a comment
router.delete("/:id", async (req, res) => {
  const commentId = req.params.id;
  try {
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
} catch (error) {
    console.error("Error deleting comment:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
  res.json({ message: "Comment deleted successfully" });
});
module.exports = router;
