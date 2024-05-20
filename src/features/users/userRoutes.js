// const {
//     verifyToken,
//     isClient,
//     isAdmin,
//     isLivreur,
//     getRoles,
//   } = require("../../middleware/authJwt");
const userController = require("./userController");
const router = require("express").Router();

module.exports = function (app) {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    router.put("/update/:id", [verifyToken, isAdmin], userController.updateById);
    router.get("/infos/:id", verifyToken, userController.findOne);
    router.get("/get-all", [verifyToken, isAdmin], userController.findAllUsers);
    router.delete("/delete/:id", [verifyToken, isAdmin], userController.delete);

    app.use("/user", router);
};
