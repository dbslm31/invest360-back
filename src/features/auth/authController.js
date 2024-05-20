const AuthService = require("./authService");

exports.signup = async (req, res, next) => {
    console.log("Request data:", req.body);
    try {
        const user = req.body;
        const response = await AuthService.signup(user);
        res.json('User signed up successfully', response);

    } catch (error) {
        console.error("Failed to handle signup:", error);
        next(error);
    }
};


exports.checkEmail = async (req, res, next) => {
    try {
        const response = await AuthService.checkEmail(req.query.email);
        if (response) {
            res.status(200).send('Mail does not exist in database');
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error("Failed to handle checkEmail:", error);
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const response = await AuthService.login(req.body.userData);
        if (response) {
            res.status(200).send('User successfully logged in');
        } else {
            res.status(404).send('There is a problem with the username/password combination');
        }
    } catch (error) {
        console.error("Failed to handle login:", error);
        next(error);
    }
};

exports.logout = async (req, res, next) => {
    try {
        const response = await AuthService.logout(req.userId);
        if (response) {
            res.status(200).send('User successfully logged out');
        } else {
            res.status(404).send('There is a problem logging out the user');
        }
    } catch (error) {
        console.error("Failed to handle logout:", error);
        next(error);
    }
};

exports.forgotPassword = async (req, res, next) => {
    try {
        const response = await AuthService.forgotPassword(req.body.email);
        if (response) {
            res.status(200).send('OK');
        } else {
            res.status(404).send('Failed to handle forgotPassword');
        }
    } catch (error) {
        console.error("Failed to handle forgotPassword:", error);
        next(error);
    }
};

exports.getResetPassword = async (req, res, next) => {
    try {
        const response = await AuthService.getResetPassword(req.params);
        if (response) {
            res.status(200).send('OK');
        } else {
            res.status(404).send('Failed to handle getResetPassword');
        }
    } catch (error) {
        console.error("Failed to handle getResetPassword:", error);
        next(error);
    }
};

exports.resetPassword = async (req, res, next) => {
    try {
        const response = await AuthService.resetPassword(
            req.params,
            req.body.password
        );
        if (response) {
            res.status(200).send('Password successfully reset');
        } else {
            res.status(404).send('Failed to reset password');
        }
    } catch (error) {
        console.error("Failed to handle resetPassword:", error);
        next(error);
    }

};

exports.refreshToken = async (req, res, next) => {
    try {
        const response = await AuthService.refreshToken(req.body.refreshToken);
        if (response) {
            res.status(200).send('Token successfully refreshed');
        } else {
            res.status(404).send('Failed to reefresh token');
        }
    } catch (error) {
        console.error("Failed to handle refreshToken:", error);
        next(error);
    }

};
