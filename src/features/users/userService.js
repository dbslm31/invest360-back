const userRepository = require('./userRepository');


exports.getAllUsers = async () => {
    return userRepository.getAllUsers();
};

exports.getUserById = async (id) => {
    return userRepository.getUserById(id);
};

exports.updateUser = async (id, updatedData) => {
    return userRepository.updateUser(id, updatedData);
};

exports.deleteUser = async (id) => {
    return userRepository.deleteUser(id);
};
