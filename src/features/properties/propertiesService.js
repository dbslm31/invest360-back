const propertiesRepository = require('./propertiesRespository.js');

exports.createNewProperty = async (data) => {
    try {
        return await propertiesRepository.create(data);
    } catch (error) {
        console.error('Erreur lors de la création du bien:', error);
        throw error;
    }
};

exports.getAll = async () => {
    try {
        return await propertiesRepository.findAll();
    } catch (error) {
        console.error('Erreur lors de la récupération des biens:', error);
        throw error;
    }
};

exports.getByUserId = async (userId) => {
    try {
        return await propertiesRepository.findByUserId(userId);
    } catch (error) {
        console.error(`Erreur lors de la récupération des biens pour l'utilisateur ${userId}:`, error);
        throw error;
    }
};

exports.getPropertyById = async (id) => {
    try {
        return await propertiesRepository.findById(id);
    } catch (error) {
        console.error(`Erreur lors de la récupération du bien ${id}:`, error);
        throw error;
    }
};

exports.updateProperty = async (id, updatedData) => {
    try {
        return await propertiesRepository.update(id, updatedData);
    } catch (error) {
        console.error(`Erreur lors de la modification du bien ${id}:`, error);
        throw error;
    }
};

exports.archiveProperty = async (id) => {
    try {
        return await propertiesRepository.archiveProperty(id);
    } catch (error) {
        console.error(`Erreur lors de l'archivage du bien ${id}:`, error);
        throw error;
    }
};
