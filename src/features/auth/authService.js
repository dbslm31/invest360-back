const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const AuthRepository = require("./authRepository");
const config = require("../../config/authConfig");
const domain = process.env.DOMAIN
const port = process.env.PORT


const signup = async (user) => {
    try {
        const existingUser = await AuthRepository.findUserByEmail(user.email);
        if (existingUser) {
            throw new Error("Registration failed due to an internal error.");
        }

        if (
            !user.email ||
            !user.password ||
            !user.firstname ||
            !user.lastname
        ) {
            throw new Error("Registration failed due to an internal error.");
        }

        const hashedPassword = bcrypt.hashSync(user.password, 8);
        const newUser = await AuthRepository.createUser({
            ...user,
            password: hashedPassword,
        });



        return {
            id: newUser.id,
            email: newUser.email,
            firstname: newUser.firstname,
            lastname: newUser.lastname,
            createdAt: newUser.createdAt,
            message: "Vous êtes bien connectés!",
        };
    } catch (error) {
        console.error("Registration failed due to an internal error.", error);
        next(error);
    }
};

const checkEmail = async (email) => {
    const existingUser = await AuthRepository.findUserByEmail(email);
    if (existingUser !== undefined && existingUser !== null) {
        return {
            message: `The email '${email}' is already in use, please try again.`,
        };
    } else {
        return { message: `The email '${email}' is available.` };
    }
};

const login = async (userData) => {
    const user = await AuthRepository.findUserByEmail(userData.email);

    if (!user) {
        console.error("Email is not in  database!");
    }

    const passwordIsValid = bcrypt.compareSync(userData.password, user.password);

    if (!passwordIsValid) {
        throw new Error("Mot de passe incorrect, veuillez réessayer.");
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.jwtExpiration,
    });

    const refreshToken = await AuthRepository.createRefreshToken(user);

    return {
        id: user.id,
        email: user.email,
        accessToken: token,
        refreshToken: refreshToken,
        message: "Vous êtes bien connectés!",
    };
};

const logout = async (userId) => {
    await AuthRepository.deleteRefreshToken(userId);
};

const forgotPassword = async (email) => {
    const user = await AuthRepository.findUserByEmail(email);
    if (!user) {
        throw new Error("User not found");
    }

    const secret = jwtSecret + user.password;
    const token = jwt.sign({ email: user.email, id: user.id }, secret, {
        expiresIn: "24h",
    });

    const link = `${domain}:${port}/reset-password/${user.id}/${token}`;
    await AuthRepository.sendResetPasswordEmail(email, link);
    return { message: "Reset password email sent successfully" };
};

const getResetPassword = async (params) => {
    const user = await AuthRepository.findUserById(params.id);
    if (!user) {
        throw new Error("User not found");
    }

    const secret = jwtSecret + user.password;
    const verify = jwt.verify(params.token, secret);

    return { message: "Verified", email: verify.email };
};

const resetPassword = async (params, newPassword) => {
    const user = await AuthRepository.findUserById(params.id);
    if (!user) {
        throw new Error("User not found");
    }

    const secret = jwtSecret + user.password;
    const verify = jwt.verify(params.token, secret);

    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    await AuthRepository.updateUserPassword(user.id, encryptedPassword);

    return { email: verify.email, status: "verified" };
};

const refreshToken = async (requestToken) => {
    if (!requestToken) {
        console.error("Refresh Token is required!");
        throw new Error("Refresh Token is required!");
    }

    const refreshToken = await AuthRepository.findRefreshToken(requestToken);
    if (!refreshToken) {
        console.error("Refresh token is not in database!");
        throw new Error("Refresh token is not in database!");
    }

    if (AuthRepository.verifyRefreshTokenExpiration(refreshToken)) {
        await AuthRepository.deleteRefreshToken(refreshToken.id);
        console.error(
            "Refresh token has expired. Please make a new signin request"
        );
        throw new Error(
            "Refresh token has expired. Please make a new signin request"
        );
    }

    const user = await refreshToken.getUser();
    const newAccessToken = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 604800,
    });

    return {
        accessToken: newAccessToken,
        refreshToken: refreshToken.token,
    };
};

module.exports = {
    signup,
    checkEmail,
    login,
    logout,
    forgotPassword,
    getResetPassword,
    resetPassword,
    refreshToken,
};
