const { verifyEmail, verifyToken } = require("../../middlewares/auth.js");
const authController = require("./authController.js");
const router = require("express").Router();




// Check email
router.get("/check-email", authController.checkEmail);

// Register
router.post("/signup", authController.signup);

// Login
router.post("/login", authController.login);

// Logout
router.post("/logout", authController.logout);

// Change password
router.post("/forgot-password", authController.forgotPassword);
router.get("/reset-password/:id/:token", authController.getResetPassword);
router.post("/reset-password/:id/:token", authController.resetPassword);

router.get("/validate-token", (req, res) => {
    res.send({ message: "Token is valid", status: true });
});

// Refresh access token
router.post("/refresh", authController.refreshToken);

module.exports = router;
