const userService = require('./userService');

//Create a new user
exports.createUser = async (req, res, next) => {
    try {
        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

//Fetch all users
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        next(error);
    }
};

//Fetch an user by ID
exports.getUserById = async (req, res, next) => {
    const { userId } = req.params;
    userService.getUserById(userId).then(user => {
        res.json(user);
    }).catch(next);
};

//Update users informations
exports.updateUser = async (req, res, next) => {
    const { userId } = req.params;
    userService.updateUser(userId).then(user => {
        res.json(user);
    }).catch(error => {
        next(error);
    });
};

//Delete an user by ID
exports.deleteUser = async (req, res, next) => {
    try {
        await userService.deleteUser(req.params.userId);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};


