const db = require('../../database/index');
const User = db.user;

exports.getAllUsers = async () => {
    return await User.findAll();
};

exports.getUserById = async (id) => {
    return await User.findOne({ where: { id: id } });
};


exports.updateUser = async (id, updatedData) => {
    const user = await User.findOne({ where: { id: id } });
    if (!user) {
        throw new Error('Utilisateur non trouvé');
    }
    return await user.update(updatedData);
};

exports.deleteUser = async (id) => {
    const user = await User.findOne({ where: { id: id } });
    if (!user) {
        throw new Error('Utilisateur non trouvé');
    }
    return await user.destroy();
};
