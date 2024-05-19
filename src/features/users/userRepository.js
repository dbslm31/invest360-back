const db = require('../../database/index');
const User = db.users;

exports.getAllUsers = async () => {
    return await User.findAll();
};

exports.getUserById = async (userId) => {
    return await User.findOne({ where: { id: userId } });
};


exports.updateUser = async (userId, updatedData) => {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
        throw new Error('Utilisateur non trouvé');
    }
    return await user.update(updatedData);
};

exports.deleteUser = async (userId) => {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
        throw new Error('Utilisateur non trouvé');
    }
    return await user.destroy();
};
