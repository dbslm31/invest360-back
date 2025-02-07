module.exports = (sequelize, Sequelize) => {
    const Lot = sequelize.define("lots", {
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
        number_of_properties: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
    });

    Lot.associate = (models) => {
        Lot.hasMany(models.Property, { foreignKey: 'lot_id' });
    };

    return Lot;
};
