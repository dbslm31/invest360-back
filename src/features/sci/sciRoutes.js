const {
    verifyToken,
} = require("../../middlewares/auth");
const sciController = require("./sciController");
const router = require("express").Router();

// Créer une SCI
router.post("/create", verifyToken, sciController.createSci);

// Obtenir toutes les SCI
router.get("/get-all", verifyToken, sciController.getAllScis);

// Obtenir une SCI par ID
router.get("/infos/:id", verifyToken, sciController.getSciById);

// Mettre à jour une SCI
router.put("/update/:id", verifyToken, sciController.updateSci);

// Archiver une SCI (changer le statut à 'inactive')
router.put("/archive/:id", verifyToken, sciController.archiveSci);

module.exports = router;
