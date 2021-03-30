const express = require("express");
const router = express.Router();
const modele = require("../models");

router.use(express.json());

router.post("/create", async (req, res) => {
  const { post_id, content } = req.body;
  const comment_id = req.params.comment_id;
  try {
    const post = await modele.post.findOne({ where: { post_id } });
    const email = post.email;
    const comment = await modele.comment.create({
      post_id,
      email,
      comment_id,
      content,
    });
    console.log(comment_id, post_id);
    return res.json(comment);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
router.get("/:post_id", async (req, res) => {
  try {
    const post_id = req.params.post_id;
    const comments = await modele.comment.findAll({ where: { post_id } });
    if (comments.length == 0) {
      return res.json("no comments");
    }
    return res.json(comments);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.delete("/:comment_id", async (req, res) => {
  try {
    const comment_id = req.params.comment_id;
    await modele.comment.destroy({
      where: {
        comment_id,
      },
    });
    return res.json("deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
