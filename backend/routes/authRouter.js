const express = require("express");
const router = express.Router();
const {createUser, loginUser, getAllUsers, getUser, deleteUser, updateUser, blockUser, unBlockUser} = require("../controller/userCtrl")
const {authMiddleware, isAdmin} = require("../middelwares/authMiddleware")
router.post("/register", createUser);
router.post("/login", loginUser)
router.get("/getAllUsers", getAllUsers)
router.get("/:id",authMiddleware, isAdmin ,getUser)
router.delete("/:id", deleteUser)
router.put("/editUser",authMiddleware, updateUser)
router.put("/blockUser/:id", authMiddleware, isAdmin, blockUser)
router.put("/unBlockUser/:id", authMiddleware, isAdmin, unBlockUser)
module.exports = router