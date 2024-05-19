module.exports = {
    secret: process.env.JWT_SECRET,
    jwtExpiration: 7200,
    jwtRefreshExpiration: 604800,
};