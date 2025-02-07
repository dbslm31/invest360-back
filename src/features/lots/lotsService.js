const lotsRepository = require('./lotsRepository');

exports.createNewLot = async (data) => {
    try {
        return await lotsRepository.create(data);
    } catch (error) {
        console.error('Erreur lors de la création du lot:', error);
        throw error;
    }
};

exports.getAllLots = async () => {
    try {
        return await lotsRepository.findAll();
    } catch (error) {
        console.error('Erreur lors de la récupération des lots:', error);
        throw error;
    }
};

exports.getLotById = async (id) => {
    try {
        return await lotsRepository.findById(id);
    } catch (error) {
        console.error('Erreur lors de la récupération du lot par ID:', error);
        throw error;
    }
};

exports.updateLot = async (id, data) => {
    try {
        return await lotsRepository.update(id, data);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du lot:', error);
        throw error;
    }
};

exports.deleteLot = async (id) => {
    try {
        return await lotsRepository.delete(id);
    } catch (error) {
        console.error('Erreur lors de la suppression du lot:', error);
        throw error;
    }
};
