const db = require("../../database/index");
const { user: User, refreshToken: RefreshToken, } = db;
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const createUser = async (user) => {
    return await User.create(user);
};


const findUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ where: { email: email } });
        return user;
    } catch (error) {
        console.error("Error finding user by email:", error);
        throw error;
    }
};

const findUserById = async (id) => {
    return await User.findOne({ where: { id: id } });
};

const createRefreshToken = async (user) => {
    const token = crypto.randomBytes(24).toString("hex");
    await RefreshToken.create({
        token,
        userId: user.id,
        expiry_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    return token;
};

const deleteRefreshToken = async (userId) => {
    try {
        const result = await RefreshToken.destroy({ where: { userId: userId } });
        return result > 0;
    } catch (error) {
        console.error("Error deleting refresh token:", error);
        throw error;
    }
};

const findRefreshToken = async (token) => {
    return await RefreshToken.findOne({ where: { token: token } });
};

const verifyRefreshTokenExpiration = (token) => {
    return token.expiryDate <= new Date();
};

const updateUserPassword = async (id, newPassword) => {
    await User.update({ password: newPassword }, { where: { id: id } });
};

const sendResetPasswordEmail = async (email, link) => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "benslim.dalila@gmail.com",
            pass: process.env.APP_PASSWORD,
        },
    });

    var mailOptions = {
        from: {
            name: "Invest360",
            address: "info@invest360.com",
        },
        to: email,
        subject: "Réinitialisation de mot de passe",
        html: `<h1>Bienvenue sur Invest360</h1><br /><h2>Réinitialisation de mot de passe</h2><br /><p>Voici votre lien pour réinitialiser votre mot de passe :</p><br/><a href="${link}">Cliquez ici</a>`,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending reset password email:", error);
        throw error;
    }
};

module.exports = {
    createUser,
    findUserByEmail,
    findUserById,
    createRefreshToken,
    deleteRefreshToken,
    findRefreshToken,
    verifyRefreshTokenExpiration,
    updateUserPassword,
    sendResetPasswordEmail,
};
