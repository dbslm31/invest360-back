const sciRepository = require("./sciRepository");

exports.createNewSci = async (data) => {
    try {
        return await sciRepository.create(data);
    } catch (error) {
        console.error('Erreur dans le service de création de SCI:', error);
        throw error;
    }
};

exports.getAllScis = async () => {
    try {
        return await sciRepository.getAll();
    } catch (error) {
        console.error('Erreur dans le service de récupération des SCI:', error);
        throw error;
    }
};

exports.getSciById = async (id) => {
    try {
        return await sciRepository.getById(id);
    } catch (error) {
        console.error('Erreur dans le service de récupération de SCI par ID:', error);
        throw error;
    }
};

exports.updateSci = async (id, data) => {
    try {
        return await sciRepository.update(id, data);
    } catch (error) {
        console.error('Erreur dans le service de mise à jour de la SCI:', error);
        throw error;
    }
};

exports.archiveSci = async (id) => {
    try {
        return await sciRepository.archive(id);
    } catch (error) {
        console.error('Erreur dans le service d\'archivage de la SCI:', error);
        throw error;
    }
};
