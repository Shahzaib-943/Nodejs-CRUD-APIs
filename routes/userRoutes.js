const express = require("express");
const router = express.Router();
const {registerUser, loginUser, currentUser} = require("../controllers/userController")
const validateToken = require("../middlewares/validateTokenHandler")

// router.post("/register",registerUser);

router.route("/register").post(registerUser);

router.get("/login",loginUser);

router.route("/current").get(validateToken, currentUser);

module.exports = router;