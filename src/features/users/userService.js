const userRepository = require('./userRepository');


exports.getAllUsers = async () => {
    return userRepository.getAllUsers();
};

exports.getUserById = async (userId) => {
    return userRepository.getUserById(userId);
};

exports.updateUser = async (userId, updatedData) => {
    return userRepository.updateUser(userId, updatedData);
};

exports.deleteUser = async (userId) => {
    return userRepository.deleteUser(userId);
};
