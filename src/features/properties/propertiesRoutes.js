const {
    verifyToken,
} = require("../../middlewares/auth");
const propertiesController = require("./propertiesController");
const router = require("express").Router();



router.post("/create", verifyToken, propertiesController.createProperty)
router.get("/get-all/:userId", verifyToken, propertiesController.getPropertiesByUserId);
router.get("/infos/:id", verifyToken, propertiesController.getPropertyById);
router.get("/get-all", verifyToken, propertiesController.getAllProperties);
router.put("/update/:id", verifyToken, propertiesController.updateProperty);
router.put("/archive/:id", verifyToken, propertiesController.archiveProperty);

module.exports = router; 
