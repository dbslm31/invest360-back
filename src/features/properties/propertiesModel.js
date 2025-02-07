module.exports = (sequelize, Sequelize) => {
    const Property = sequelize.define("properties", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        area: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false, // Surface est maintenant obligatoire
        },
        type: {
            type: Sequelize.ENUM('building', 'flat', 'house', 'parking', 'commercial building', 'land'),
            allowNull: false,
        },
        address: { // Renommé de `localization` à `address`
            type: Sequelize.STRING,
            allowNull: true,
        },
        furnished: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        rented: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        is_archived: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        price: { // Ajout du champ `price`
            type: Sequelize.DECIMAL(15, 2),
            allowNull: false,
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        lot_id: { // Ajout du champ `lot_id` pour la relation avec les lots
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'lots', // Table `lots` doit exister
                key: 'id',
            },
            onDelete: 'SET NULL', // Si le lot est supprimé, mettre `lot_id` à NULL
        },
    });

    Property.associate = (models) => {
        Property.belongsTo(models.User, { foreignKey: 'user_id' });
        Property.belongsTo(models.Lot, { foreignKey: 'lot_id' });
    };

    return Property;
};
