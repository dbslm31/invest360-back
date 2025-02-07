const {
    verifyToken,
} = require("../../middlewares/auth");
const lotsController = require("./lotsController");
const router = require("express").Router();

// Route pour créer un lot
router.post("/create", verifyToken, lotsController.createLot);

// Route pour obtenir tous les lots
router.get("/get-all", verifyToken, lotsController.getAllLots);

// Route pour obtenir un lot par son ID
router.get("/infos/:id", verifyToken, lotsController.getLotById);

// Route pour mettre à jour un lot
router.put("/update/:id", verifyToken, lotsController.updateLot);

// Route pour supprimer un lot
router.delete("/delete/:id", verifyToken, lotsController.deleteLot);

module.exports = router;
