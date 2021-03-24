const express = require("express");
const router = express.Router();
const { User } = require("../models/user");

router.use(express.json());

router.get("/create", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const user = await User.create({ firstname, lastname, email, password });
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.get("/new", (req, res) => {});
router.get("/user_id", (req, res) => {});
router.get("/user_id/profile_pic", (req, res) => {});
router.put("/user_id", (req, res) => {});
router.delete("/user_id", (req, res) => {});

module.exports = router;
