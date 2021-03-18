const Feedback = require("../models/feedback");

const feedback_ind = (req, res) => {
  Feedback.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { feedbacks: result, title: "All feedbacks" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const feedback_details = (req, res) => {
  const id = req.params.id;
  Feedback.findById(id)
    .then((result) => {
      res.render("details", { feedback: result, title: "feedback Details" });
    })
    .catch((err) => {
      res.status("404").render("404", { title: "feed back not found" });
    });
};

const feedback_write_get = (req, res) => {
  res.render("create", { title: "write a new feed back" });
};
const feedback_write_post = (req, res) => {
  const feedback = new Feedback(req.body);

  feedback
    .save()
    .then((result) => {
      res.redirect("/feedbacks");
    })
    .catch((err) => {
      console.log(err);
    });
};
const feedback_delete = (req, res) => {
  const id = req.params.id;

  Feedback.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/feedbacks" });
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = {
  feedback_ind,
  feedback_details,
  feedback_write_get,
  feedback_write_post,
  feedback_delete,
};
