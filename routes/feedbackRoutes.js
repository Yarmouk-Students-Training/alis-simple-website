const express = require("express");
const feedbackController = require("../controllers/feedbackcontroller");
const miniApp = express.Router();

miniApp.get("/write", feedbackController.feedback_write_get);
miniApp.get("/", feedbackController.feedback_ind);
miniApp.get("/:id", feedbackController.feedback_details);
miniApp.post("/", feedbackController.feedback_write_post);
miniApp.delete("/:id", feedbackController.feedback_delete);

module.exports = miniApp;
