const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const feedbackroutes = require("./routes/feedbackRoutes");

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI =
  "mongodb+srv://ali:Ali1234@nodejs.hy3e3.mongodb.net/node-Feeds?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get("/", (req, res) => {
  res.redirect("/feedbacks");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// feedback routes

app.use("/feedbacks", feedbackroutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
