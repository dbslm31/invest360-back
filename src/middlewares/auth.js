
const database = require("../database/index.js");
const { user: User, role: Role } = database;
const jwt = require("jsonwebtoken");
const config = require("../config/authConfig.js");
const { TokenExpiredError } = jwt;

const ROLES = ["admin", "tenant", "owner"];

const catchError = (err, req, res, next) => {
    if (err instanceof TokenExpiredError) {
        var io = req.app.get("socketio");
        io.emit("loggin-status", {
            message: "Token has expired!",
            status: false,
        });
        return res
            .status(401)
            .send({ message: "Unauthorized Access : Token has expired!" });
    }
    next(new Error("Unauthorized access : Token is invalid!"));
};

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return catchError(err, req, res, next);
        }
        req.userId = decoded.id;
        next();
    });
};

const verifyEmail = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (user) {
            return res.status(400).send({
                message: `Email « ${user.email} » is already in use, please try again.`,
            });
        }
        next();
    } catch (error) {
        next(error);
    }
};

const checkRolesExisting = (req, res, next) => {
    if (req.body.roles && !req.body.roles.every((role) => ROLES.includes(role))) {
        return res.status(400).send({ message: "One or more roles do not exist!" });
    }
    next();
};

const hasRole = (role) => {
    return async (req, res, next) => {
        try {
            const user = await User.findByPk(req.userId, { include: Role });
            if (user && user.role.role === role) {
                next();
            } else {
                throw new Error(`Required role: ${role}`);
            }
        } catch (error) {
            next(error);
        }
    };
};

const hasAnyRole = (...roles) => {
    return async (req, res, next) => {
        try {
            const user = await User.findByPk(req.userId, { include: Role });
            if (user && roles.includes(user.role.role)) {
                next();
            } else {
                throw new Error(`Required any of the roles: ${roles.join(", ")}`);
            }
        } catch (error) {
            next(error);
        }
    };
};

const getRoles = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId, { include: Role });
        if (user) {
            res.status(200).send(user.role?.role);
        } else {
            throw new Error("Some error occurred while retrieving role");
        }
    } catch (error) {
        next(error);
    }
};

const authJwt = {
    verifyToken,
    verifyEmail,
    checkRolesExisting,
    isAdmin: hasRole("admin"),
    isClient: hasRole("client"),
    isLivreur: hasRole("livreur"),
    isAdminOrLivreur: hasAnyRole("admin", "livreur"),
    isAdminOrClient: hasAnyRole("admin", "client"),
    getRoles,
};

module.exports = authJwt;
