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
            throw new Error("User already exists.");
        }

        if (!user.email || !user.password || !user.firstname || !user.lastname) {
            throw new Error("All fields are required.");
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
            message: "You have successfully signed up!",
        };
    } catch (error) {
        console.error("Registration failed:", error);
        throw error;
    }
};


const checkEmail = async (email) => {
    try {
        const existingUser = await AuthRepository.findUserByEmail(email);
        if (existingUser) {
            return {
                exists: true,
                message: `The email '${email}' is already in use, please try again.`,
            };
        } else {
            return {
                exists: false,
                message: `The email '${email}' is available.`,
            };
        }
    } catch (error) {
        console.error("Error checking email:", error);
        throw error;
    }
};


const login = async (userData) => {
    console.log("userData", userData);
    try {
        const user = await AuthRepository.findUserByEmail(userData.email);
        console.log('user', user);

        if (!user) {
            throw new Error("Email is not in the database!");
        }

        const passwordIsValid = bcrypt.compareSync(userData.password, user.password);

        if (!passwordIsValid) {
            throw new Error("Incorrect password, please try again.");
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
            message: "Successfully logged in!",
        };
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
};


const logout = async (userId) => {
    console.log('userId in service', userId)
    try {
        const result = await AuthRepository.deleteRefreshToken(userId);
        if (result) {
            return true;
        } else {
            throw new Error("Failed to delete refresh token.");
        }
    } catch (error) {
        console.error("Logout failed:", error);
        throw error;
    }
};

const forgotPassword = async (email) => {
    try {
        const user = await AuthRepository.findUserByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }

        const secret = config.secret + user.password;
        const token = jwt.sign({ email: user.email, id: user.id }, secret, {
            expiresIn: "24h",
        });

        const link = `${domain}:${port}/reset-password/${user.id}/${token}`;
        await AuthRepository.sendResetPasswordEmail(email, link);
        return { message: "Reset password email sent successfully" };
    } catch (error) {
        console.error("Error in forgotPassword service:", error);
        throw error;
    }
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
    try {
        const user = await AuthRepository.findUserById(params.id);
        if (!user) {
            throw new Error("User not found");
        }

        const secret = config.jwtSecret + user.password;
        const verify = jwt.verify(params.token, secret);

        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        await AuthRepository.updateUserPassword(user.id, encryptedPassword);

        return { email: verify.email, status: "verified" };
    } catch (error) {
        console.error("Error in resetPassword service:", error);
        throw error;
    }
};

const refreshToken = async (requestToken) => {
    try {
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
            console.error("Refresh token has expired. Please make a new signin request");
            throw new Error("Refresh token has expired. Please make a new signin request");
        }

        const user = await refreshToken.getUser();
        const newAccessToken = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 604800, // 7 days
        });

        return {
            accessToken: newAccessToken,
            refreshToken: refreshToken.token,
        };
    } catch (error) {
        console.error("Error in refreshToken service:", error);
        throw error;
    }
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
