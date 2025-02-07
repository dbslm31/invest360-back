const db = require('../../database/index');
const Property = db.property;


exports.create = async (data) => {
    return await Property.create(data);
};


exports.findAll = async () => {
    return await Property.findAll();
};


exports.findByUserId = async (userId) => {
    return await Property.findAll({ where: { user_id: userId } });
};


exports.findById = async (id) => {
    return await Property.findOne({ where: { id: id } });
};


exports.update = async (id, updatedData) => {
    const property = await Property.findOne({ where: { id: id } });
    if (!property) {
        throw new Error('Bien non trouvé');
    }
    return await property.update(updatedData);
};


exports.archiveProperty = async (id) => {
    const property = await Property.findOne({ where: { id: id } });
    if (!property) {
        throw new Error('Bien non trouvé');
    }
    return await property.update({ is_archived: true });
};
