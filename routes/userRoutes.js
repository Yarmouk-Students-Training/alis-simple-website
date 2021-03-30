const express = require("express");
const router = express.Router();
const modele = require("../models");
const bcrypt = require("bcrypt");

router.use(express.json());

// create a new user
router.post("/create", async (req, res) => {
  const hashedpass = await bcrypt.hash(req.body.password, 10);
  const { firstName, lastName, email, password, gender } = req.body;
  try {
    const new_user = await modele.user.create({
      firstName,
      lastName,
      email,
      password: hashedpass,
      gender,
    });
    return res.json(new_user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.get("/new", (req, res) => {});
// return all users
router.get("/all", async (req, res) => {
  try {
    const user = await modele.user.findAll();
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// return a user

router.get("/:email", async (req, res) => {
  const email = req.params.email;
  try {
    const user = await modele.user.findOne({
      where: { email },
      attributes: { exclude: ["password"] },
    });
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err });
  }
});
// // to delete a user
router.delete("/:email", async (req, res) => {
  const email = req.params.email;
  try {
    const user = await modele.user.findOne({ where: { email } });
    await user.destroy();

    return res.json({ message: " deleted!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
