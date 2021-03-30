const express = require("express");
const router = express.Router();
const modele = require("../models");

router.use(express.json());

router.post("/create", async (req, res) => {
  const { email, post_id, content } = req.body;
  try {
    const post = await modele.post.create({ email, post_id, content });

    return res.json(post);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
router.post("/new", (req, res) => {
  console.log("");
});
router.get("/all", (req, res) => {
  router.get("/all", async (req, res) => {
    try {
      const posts = await modele.post.findAll();
      return res.json(posts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });
});
router.get("/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const posts = await modele.post.findAll({ where: { email } });
    if (posts.length == 0) {
      return res.json("no posts");
    }
    return res.json(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.get("/:post_id", async (req, res) => {
  const post_id = req.params.post_id;
  try {
    const post = await modele.post.findByPk(post_id);

    return res.json(post);
  } catch (err) {
    console.log(err);

    return res.status(500).json(err);
  }
});
router.put("/:post_id", async (req, res) => {
  const post_id = req.params.post_id;
  const { content } = req.body;
  try {
    const post = await modele.post.findByPk(post_id);
    post.content = content;
    return res.json(post);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
router.delete("/:post_id", async (req, res) => {
  const post_id = req.params.post_id;

  try {
    await modele.post.destroy({
      where: { post_id },
    });

    return res.json("deleted");
  } catch (err) {
    console.log(err);

    return res.status(500).json(err);
  }
});

module.exports = router;
