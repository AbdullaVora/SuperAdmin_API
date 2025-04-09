const express = require("express");
const { loginUser, registerUser, getUsers, updateUsers } = require("../../controllers/auth/userControl");
const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/getUsers", getUsers)
router.put("/editUser/:id", updateUsers);

module.exports = router;