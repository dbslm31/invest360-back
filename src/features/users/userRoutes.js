const {
    verifyToken,
    isClient,
    isAdmin,
    isLivreur,
    getRoles,
} = require("../../middlewares/auth");
const userController = require("./userController");
const router = require("express").Router();




router.put("/update/:id", verifyToken, userController.updateUser);
router.get("/infos/:id", verifyToken, userController.getUserById);
router.get("/get-all", verifyToken, userController.getAllUsers);
router.delete("/delete/:id", verifyToken, userController.deleteUser);

module.exports = router; 
