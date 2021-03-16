const express = require("express");

// express app
const app = express();

// listen for requests
app.listen(3000);

// register view engine
app.set("view engine", "ejs");
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
  res.render("opinion", { title: "write your opinion" });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
