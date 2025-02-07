const Sci = require("./sciModel");

exports.create = async (data) => {
    try {
        return await Sci.create(data);
    } catch (error) {
        console.error('Erreur dans le repository de création de SCI:', error);
        throw error;
    }
};

exports.getAll = async () => {
    try {
        return await Sci.findAll();
    } catch (error) {
        console.error('Erreur dans le repository de récupération des SCI:', error);
        throw error;
    }
};

exports.getById = async (id) => {
    try {
        return await Sci.findByPk(id);
    } catch (error) {
        console.error('Erreur dans le repository de récupération de SCI par ID:', error);
        throw error;
    }
};

exports.update = async (id, data) => {
    try {
        const sci = await Sci.findByPk(id);
        if (!sci) throw new Error('SCI non trouvée');
        return await sci.update(data);
    } catch (error) {
        console.error('Erreur dans le repository de mise à jour de SCI:', error);
        throw error;
    }
};

exports.archive = async (id) => {
    try {
        const sci = await Sci.findByPk(id);
        if (!sci) throw new Error('SCI non trouvée');
        return await sci.update({ status: 'inactive' });
    } catch (error) {
        console.error('Erreur dans le repository d\'archivage de SCI:', error);
        throw error;
    }
};
