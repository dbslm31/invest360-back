const AuthService = require("./authService");

const signup = async (req, res) => {
    try {
        const user = req.body;
        const response = await AuthService.signup(user);
        res.status(201).json({ message: 'User signed up successfully', user: response });
    } catch (error) {
        res.status(500).json({ error: 'Failed to sign up user' });
    }
};

const checkEmail = async (req, res, next) => {
    try {
        const response = await AuthService.checkEmail(req.query.email);
        if (response.exists) {
            res.status(409).json({ message: response.message });
        } else {
            res.status(200).json({ message: response.message });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to check email' });
    }
};

const login = async (req, res, next) => {
    try {
        const response = await AuthService.login(req.body.userData);
        res.status(200).json({ message: 'User successfully logged in', data: response });
    } catch (error) {
        res.status(401).json({ error: 'Invalid username/password combination' });
    }
};

const logout = async (req, res, next) => {
    try {
        const response = await AuthService.logout(req.userId);
        if (response) {
            res.status(200).send('User successfully logged out');
        } else {
            res.status(500).send('There is a problem logging out the user');
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to log out user' });
    }
};

const forgotPassword = async (req, res, next) => {
    try {
        const response = await AuthService.forgotPassword(req.body.email);
        res.status(200).json({ message: 'OK', data: response });
    } catch (error) {
        res.status(500).json({ error: 'Failed to handle forgotPassword' });
    }
};

const getResetPassword = async (req, res, next) => {
    try {
        const response = await AuthService.getResetPassword(req.params);
        if (response) {
            res.status(200).send('OK');
        } else {
            res.status(404).send('Failed to handle getResetPassword');
        }
    } catch (error) {
        next(error);
    }
};

const resetPassword = async (req, res, next) => {
    try {
        const response = await AuthService.resetPassword(req.params, req.body.password);
        if (response) {
            res.status(200).send('Password successfully reset');
        } else {
            res.status(500).send('Failed to reset password');
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to reset password' });
    }
};

const refreshToken = async (req, res, next) => {
    try {
        const response = await AuthService.refreshToken(req.body.refreshToken);
        if (response) {
            res.status(200).json({
                accessToken: response.accessToken,
                refreshToken: response.refreshToken
            });
        } else {
            res.status(404).json({ error: 'Failed to refresh token' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to refresh token' });
    }
};

module.exports = { signup, checkEmail, login, logout, forgotPassword, getResetPassword, resetPassword, refreshToken };
