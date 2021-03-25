const express = require("express");
const router = express.Router();
const modele = require("../models");

router.use(express.json());

router.post("/create", async (req, res) => {
  const { userEmail, content, post_id } = req.body;
  try {
    const user = await modele.user.findOne({ where: { email: userEmail } });
    const post = await modele.post.create({
      content,
      post_id,
    });
    return res.json(post);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
router.post("/new", (req, res) => {
  console.log("");
});
router.get("/posts", (req, res) => {
  console.log("");
});
router.get("/posts/user/user_id", (req, res) => {
  console.log("");
});
router.put("/post_id", (req, res) => {
  console.log("");
});
router.delete("/post_id", (req, res) => {
  console.log("");
});

module.exports = router;
