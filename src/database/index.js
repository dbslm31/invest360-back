const Sequelize = require("sequelize");
const sequelize = require('../config/sequelize.js');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../features/users/userModel.js")(sequelize, Sequelize);
db.refreshToken = require("../features/auth/refreshTokensModel.js")(sequelize, Sequelize);
db.role = require("../features/roles/rolesModel.js")(sequelize, Sequelize);

// REFRESH TOKENS
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

// ROLES
db.user.hasMany(db.role, {
    foreignKey: "user_id",
    sourceKey: "id",
    as: "roles"
});

db.role.belongsTo(db.user, {
    foreignKey: "user_id",
    targetKey: "id",
    as: "user"
});

module.exports = db;
