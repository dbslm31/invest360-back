const userService = require('./userService');

//Fetch all users
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        next(error);
    }
};

//Fetch a user by ID
exports.getUserById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await userService.getUserById(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        next(error);
    }
};

//Update user information
exports.updateUser = async (req, res, next) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        const updatedUser = await userService.updateUser(id, updatedData);
        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
};

//Delete a user by ID
exports.deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await userService.deleteUser(id);
        if (result) {
            res.status(204).send('User deleted successfully');
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        next(error);
    }
};
