const db = require('../../database/index');
const Lot = db.lot;

exports.create = async (data) => {
    try {
        return await Lot.create(data);
    } catch (error) {
        console.error('Erreur lors de la création du lot dans le repository:', error);
        throw error;
    }
};

exports.findAll = async () => {
    try {
        return await Lot.findAll();
    } catch (error) {
        console.error('Erreur lors de la récupération des lots dans le repository:', error);
        throw error;
    }
};

exports.findById = async (id) => {
    try {
        return await Lot.findOne({ where: { id } });
    } catch (error) {
        console.error('Erreur lors de la récupération du lot par ID dans le repository:', error);
        throw error;
    }
};

exports.update = async (id, data) => {
    try {
        const lot = await Lot.findOne({ where: { id } });

        if (lot) {
            return await lot.update(data);
        }

        return null;
    } catch (error) {
        console.error('Erreur lors de la mise à jour du lot dans le repository:', error);
        throw error;
    }
};

exports.delete = async (id) => {
    try {
        const lot = await Lot.findOne({ where: { id } });

        if (lot) {
            await lot.destroy();
            return true;
        }

        return false;
    } catch (error) {
        console.error('Erreur lors de la suppression du lot dans le repository:', error);
        throw error;
    }
};
