const Sequelize = require("sequelize");
const sequelize = require('../config/sequelize.js');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../features/users/userModel.js")(sequelize, Sequelize);
db.refreshToken = require("../features/auth/refreshTokensModel.js")(sequelize, Sequelize);
db.role = require("../features/roles/rolesModel.js")(sequelize, Sequelize);
db.property = require("../features/properties/propertiesModel.js")(sequelize, Sequelize);
db.lot = require("../features/lots/lotsModel.js")(sequelize, Sequelize); // Correction du require

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

// PROPERTIES
db.user.hasMany(db.property, {
    foreignKey: "user_id",
    sourceKey: "id",
    as: "properties"
});

db.property.belongsTo(db.user, {
    foreignKey: "user_id",
    targetKey: "id",
    as: "user"
});

// LOTS
db.property.belongsTo(db.lot, {
    foreignKey: "lot_id", // Associe chaque propriété à un lot
    targetKey: "id",
    as: "lot"
});

db.lot.hasMany(db.property, {
    foreignKey: "lot_id", // Un lot peut contenir plusieurs propriétés
    sourceKey: "id",
    as: "properties"
});

module.exports = db;
