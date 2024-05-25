const config = require("../../config/authConfig");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, Sequelize) => {
    const RefreshToken = sequelize.define("refresh_tokens", {
        token: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        expiry_date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }

    });

    return RefreshToken;

    // RefreshToken.createToken = async function (user) {
    //     let expiredAt = new Date(Date.now() + config.jwtRefreshExpiration * 1000);
    //     console.log(`ExpiredAt: ${expiredAt}`); // Vérifiez la date d'expiration
    //     let _token = uuidv4();
    //     console.log(`Token: ${_token}`); // Vérifiez le token généré
    //     try {
    //         let refreshToken = await this.create({
    //             token: _token,
    //             user_id: user.id,
    //             expiryDate: expiredAt,
    //         });
    //         console.log(`RefreshToken: ${refreshToken}`); // Vérifiez l'objet créé
    //         return refreshToken.token;
    //     } catch (error) {
    //         console.error("Erreur lors de la création du RefreshToken:", error);
    //         throw error;
    //     }
    // };


    // RefreshToken.verifyExpiration = (token) => {
    //     return token.expiryDate < new Date();
    // };

    // return RefreshToken;


};
