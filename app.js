const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

// express app
const app = express();

// listen for requests

const URI =
  "mongodb+srv://alizarraq:ali1234@cluster0.qrmo3.mongodb.net/nodeJ?retryWrites=true&w=majority";
mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => app.listen(3000))
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// listen for requests
app.listen(3000);
app.use(express.static("public"));

// app.set('views', 'myviews');

app.get("/", (req, res) => {
  const feedbacks = [
    {
      title: "mahmmed",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "sara",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "loui",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
  ];
  res.render("index", { title: "Home", feedbacks });
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});
app.get("/opinion", (req, res) => {
  res.render("opinion", { title: "opinion" });
});
// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
