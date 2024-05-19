const Sequelize = require("sequelize");
const sequelize = require('../config/sequelize.js')

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../features/users/userModel.js")(sequelize, Sequelize);


// db.group_orders_participants.belongsTo(db.group_orders, {
//     foreignKey: "group_order_id",
//     targetKey: "id",
//     as: "group_order",
// });

// db.group_orders_participants.belongsTo(db.user, {
//     foreignKey: "user_id",
//     targetKey: "id",
//     as: "user",
// });

// db.group_orders_participants.belongsTo(db.orders, {
//     foreignKey: "order_id",
//     targetKey: "id",
//     as: "order",
// });

// db.group_orders_participants.belongsTo(db.address, {
//     foreignKey: "address_id",
//     targetKey: "id",
//     as: "address",
// });

// db.recipes.belongsToMany(db.product, {
//     as: "products",
//     through: recipe_products,
//     foreignKey: "recipesId",
//     targetKey: "id",
// });

// db.product.belongsToMany(db.recipes, {
//     through: recipe_products,
//     foreignKey: "productId",
//     targetKey: "id",
// });

// /** TOKEN */
// db.refreshToken.belongsTo(db.user, {
//     foreignKey: "userId",
//     targetKey: "id",
// });
// db.user.hasOne(db.refreshToken, {
//     foreignKey: "userId",
//     targetKey: "id",
// });

// /** ROLES */
// db.role.hasMany(db.user);
// db.user.belongsTo(db.role);

// /** ALLERGY */
// db.user.belongsToMany(db.allergy, {
//     as: "allergies",
//     through: "user_allergies",
//     foreignKey: "userId",
//     targetKey: "id",
// });
// db.allergy.belongsToMany(db.user, {
//     through: "user_allergies",
//     foreignKey: "allergyId",
//     targetKey: "id",
// });
// // db.allergy.belongsToMany(db.product, {
// //   through: "products_allergies",
// //   foreignKey: "allergyId",
// //   targetKey: "id",
// // });

// // db.products_allergies.hasMany(db.product, {
// //   as: "productId",
// // });

// /** RUSHOUR */
// db.rushour_links.belongsTo(db.user, { as: "user" });

// /** ADDRESS */
// db.user.hasMany(db.address, { as: "addresses" });
// db.address.belongsTo(db.user, { as: "user" });

// /** PAYMENT */
// db.user.hasMany(db.payment, { as: "payments" });
// db.payment.belongsTo(db.user, { as: "user" });

// /** ORDERS */
// db.user.hasMany(db.orders, { as: "orders" });
// db.orders.belongsTo(db.user, { as: "user" });

// /** DELIVERY */
// db.user.hasMany(db.delivery, { as: "deliveries" });
// db.delivery.belongsTo(db.user, { as: "user" });

// /** DELIVERY + ORDERS */
// db.delivery.hasMany(db.orders, {
//     foreignKey: "deliveryId",
//     targetKey: "id",
// });

// db.orders.belongsTo(db.delivery, {
//     foreignKey: "deliveryId",
//     targetKey: "id",
// });

// /** DISCOUNT */
// db.user.hasMany(sequelize.models.promocodes, { foreignKey: "user_id" });
// db.promocodes.belongsTo(db.user, { foreignKey: "user_id", as: "user" });

// /** INVOICES */
// db.user.hasMany(sequelize.models.invoices, { foreignKey: "user_id" });
// db.invoices.belongsTo(db.user, { foreignKey: "user_id", as: "user" });

// db.orders.belongsTo(db.address, {
//     foreignKey: "addressId",
//     targetKey: "id",
// });

// db.product.belongsToMany(db.recipes, {
//     through: "ingredients",
//     foreignKey: "productId",
//     targetKey: "id",
// });

// db.product.belongsToMany(db.menus, {
//     through: "shopping_lists",
//     foreignKey: "product_id",
//     otherKey: "menu_id",
// });

// db.menus.belongsToMany(db.product, {
//     through: "shopping_lists",
//     foreignKey: "menu_id",
//     otherKey: "product_id",
// });
// db.recipes.belongsToMany(db.product, {
//     through: "ingredients",
//     foreignKey: "recipesId",
//     targetKey: "id",
// });

// /** DB NUTRITION_FACTS RELATION TO RECIPES */
// db.recipes.hasOne(db.nutrition_facts, {
//     as: "nutrition_facts",
//     foreignKey: "recipe_id",
//     sourceKey: "id",
// });

// /** DB NUTRITION_FACTS */
// db.nutrition_facts.belongsTo(db.recipes, {
//     as: "recipes",
//     foreignKey: "recipe_id",
//     targetKey: "id",
// });

// db.menus.belongsToMany(db.parts, {
//     as: "parts",
//     through: "menu_parts",
//     foreignKey: "menu_partsId",
//     targetKey: "id",
// });

// db.menus.belongsToMany(db.menu_recipes, {
//     through: "menu_recipes",
//     foreignKey: "menu_id",
//     targetKey: "id",
//     as: "recipes",
// });

// db.menu_recipes.belongsToMany(db.menus, {
//     through: "menu_recipes",
//     foreignKey: "recipe_id",
//     targetKey: "id",
//     as: "menus",
// });

// db.parts.belongsToMany(db.menus, {
//     through: "menu_parts",
//     foreignKey: "menuId",
//     targetKey: "id",
// });

// db.order_items.belongsTo(db.orders, {
//     as: "order_items",
//     foreignKey: "orderId",
// });
// db.orders.hasMany(db.order_items, { as: "order_items", foreignKey: "orderId" });

// db.order_items.belongsTo(db.recipes);
// db.recipes.hasMany(db.order_items);

// // db.product.belongsToMany(db.allergy, {
// //   as: "allergies",
// //   through: "ingredients_allergies",
// //   foreignKey: "ingredientId",
// //   targetKey: "id",
// // });
// // db.allergy.belongsToMany(db.product, {
// //   through: "ingredients_allergies",
// //   foreignKey: "allergyId",
// //   targetKey: "id",
// // });

// db.recipes.hasMany(db.product_picture, {
//     as: "pictures",
//     foreignKey: "recipe_id",
// });
// db.product_picture.belongsTo(db.recipes, {
//     as: "recipes",
//     foreignKey: "recipe_id",
//     targetKey: "id",
// });
// db.recipes.belongsToMany(db.product, {
//     as: "recipeProducts",
//     through: "recipe_products",
//     foreignKey: "recipesId",
//     targetKey: "id",
// });

// db.parts.hasMany(db.recipes, {
//     as: "recipes",
// });
// db.recipes.belongsTo(db.parts);

// db.user.hasMany(db.subscriptions, {
//     foreignKey: "user_id",
//     as: "subscriptions",
// });

// db.subscriptions.belongsTo(db.user, {
//     foreignKey: "user_id",
//     as: "user",
// });

// module.exports = db;
