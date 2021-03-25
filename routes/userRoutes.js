const express = require("express");
const router = express.Router();
const modele = require("../models");

router.use(express.json());

// create a new user
router.post("/create", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const new_user = await modele.user.create({
      firstName,
      lastName,
      email,
      password,
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
    });
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err });
  }
});
// return a user pitcture
router.get("/:email/profile_picture", async (req, res) => {
  const picture = req.params.picture;
  try {
    const user = await modele.user.picture.findOne({
      where: { picture },
    });
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err });
  }
});
// to edit the user info
router.put("/:email", async (req, res) => {
  const email = req.params.email;
  console.log(email);
  const {
    newFirstName,
    newLastName,
    newEmail,
    newPassword,
    newPicture,
  } = req.body;
  try {
    const user = await modele.user.findOne({ where: { email } });
    firstName = newFirstName;
    lastName = newLastName;
    email = newEmail;
    password = newPassword;
    picture = newPicture;
    await user.save();
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
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
