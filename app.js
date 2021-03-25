const { sequelize } = require("./models");
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const reactRoutes = require("./routes/reactRoutes");

const app = express();

app.listen({ port: 5000 }, async () => {
  console.log("server is up on port 3000");
  await sequelize.sync({ alert: true });
  console.log("database synced");
});

// routes
app.get("/", (req, res) => {});

// user routes=
app.use("/user", userRoutes);
// post routes=
app.use("/post", postRoutes);
// user routes=
app.use("/comment", commentRoutes);
// user routes=
app.use("/react", reactRoutes);
