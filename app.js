const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Feed = require("./models/feed");
// express app
const app = express();

const URI =
  "mongodb+srv://alizarraq:ali1234@cluster0.qrmo3.mongodb.net/nodeJ?retryWrites=true&w=majority";
mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => app.listen(3000))
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

app.get("/add-opinion", (req, res) => {
  const feed = new Feed({
    title: "new opinion",
    snippet: "your feedback",
    body: "more about your opinion",
  });
  feed
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/all-opinions", (req, res) => {
  Feed.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/single-opinion", (req, res) => {
  Feed.findById("605218041af9221ee7336401")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/", (req, res) => {
  res.redirect("/feedbacks");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// feeedback roots
app.get("/opinion", (req, res) => {
  res.render("opinion", { title: "Create a new opinion" });
});

app.get("/feedbacks", (req, res) => {
  Feed.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { feedbacks: result, title: "All blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.post("/feedbacks", (req, res) => {
  const feed = new Feed(req.body);

  feed
    .save()
    .then((result) => {
      res.redirect("/feedbacks");
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/opinion", (req, res) => {
  res.render("opinion", { title: "opinion" });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
