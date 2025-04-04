const express = require("express");
const { loginUser, registerUser, getUsers } = require("../../controllers/auth/userControl");
const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/getUsers", getUsers)

module.exports = router;