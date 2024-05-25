const Sequelize = require("sequelize");
const sequelize = require('../config/sequelize.js')

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../features/users/userModel.js")(sequelize, Sequelize);
db.refreshToken = require("../features/auth/refreshTokensModel.js")(sequelize, Sequelize);

db.refreshToken.belongsTo(db.user, {
    foreignKey: "userId",
    targetKey: "id",
    as: "user",
});

db.user.hasMany(db.refreshToken, {
    foreignKey: "userId",
    sourceKey: "id",
    as: "refreshTokens",
});


module.exports = db;
