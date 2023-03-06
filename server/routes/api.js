const express = require("express");
const router = express.Router();

const { registerUser, signInUser } = require("../controller/userController");
const {
  addMemory,
  getMemory,
  searchMemory,
  addFavouriteMemory,
  getUser,
} = require("../controller/memoryController");
const auth = require("../middleware/auth");

router.post("/signup", registerUser);
router.post("/signin", signInUser);

router.post("/memory", auth, addMemory);
router.get("/memory", auth, getMemory);

router.get("/search", auth, searchMemory);

router.put("/favorite/:userId", auth, addFavouriteMemory);

module.exports = router;
