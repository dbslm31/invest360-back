module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {

        firstname: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        lastname: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        address: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        zip_code: {
            type: Sequelize.STRING
        },
        phone_number: {
            type: Sequelize.STRING
        },
        profil_picture: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING
        },
    });
    return User;
};
