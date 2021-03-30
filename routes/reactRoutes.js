const express = require("express");
const router = express.Router();
const modele = require("../models");

router.use(express.json());

router.post("/create", async (req, res) => {
  const { post_id, type } = req.body;
  const reaction_id = req.params.reaction_id;
  try {
    const post = await modele.post.findOne({ where: { post_id } });
    const email = post.email;
    const reactions = await modele.reactions.create({
      post_id,
      email,
      reaction_id,
      type,
    });
    return res.json(reactions);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
router.get("/:post_id", async (req, res) => {
  try {
    const post_id = req.params.post_id;
    const reactions = await modele.reactions.findAll({ where: { post_id } });
    if (reactions.length == 0) {
      return res.json("no reactions");
    }
    return res.json(reactions);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});



router.delete("/:reaction_id", async (req, res) => {
  try {
    const reaction_id = req.params.reaction_id;
    await modele.reactions.destroy({
      where: {
        reaction_id,
      },
    });
    return res.json("deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
