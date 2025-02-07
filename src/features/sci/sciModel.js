const Sequelize = require("sequelize");
const sequelize = require('../config/sequelize.js');

const Sci = sequelize.define("sci", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    siret: {
        type: Sequelize.STRING(14),
        allowNull: false,
        unique: true,
    },
    address: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    capital: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0.00,
    },
    creation_date: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    status: {
        type: Sequelize.ENUM('active', 'inactive', 'dissolved'),
        allowNull: false,
        defaultValue: 'active',
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        onUpdate: Sequelize.NOW,
    }
});

// Relation avec l'utilisateur
Sci.belongsTo(sequelize.models.user, { foreignKey: 'user_id', as: 'user' });

module.exports = Sci;

