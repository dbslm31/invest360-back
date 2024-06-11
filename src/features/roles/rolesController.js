const rolesService = require('./rolesService');

//Link a role to a user
exports.addRoletoUser = async (req, res, next) => {
    try {
        const roles = await rolesService.addRoletoUser();
        res.json(roles);
    } catch (error) {
        next(error);
    }
};


//Fetch all roles
exports.getAllRoles = async (req, res, next) => {
    try {
        const roles = await rolesService.getAllRoles();
        res.json(roles);
    } catch (error) {
        next(error);
    }
};

//Fetch a role by ID
exports.getRolesById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await rolesService.getRolesById(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('Role not found');
        }
    } catch (error) {
        next(error);
    }
};

//Fetch a role by userId
exports.getRolesByUserId = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await rolesService.getRolesByUserId(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        next(error);
    }
};

//Update role information
exports.updateRole = async (req, res, next) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        const updatedUser = await rolesService.updateRole(id, updatedData);
        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
};

//Delete a role by ID
exports.deleteRole = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await rolesService.deleteRole(id);
        if (result) {
            res.status(204).send('User deleted successfully');
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        next(error);
    }
};
