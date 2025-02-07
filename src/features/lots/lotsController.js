const lotsService = require('./lotsService');

exports.createLot = async (req, res) => {
    try {
        const { name, description, number_of_properties } = req.body;

        // Vérification des champs requis
        if (!name) {
            return res.status(400).json({ message: 'Le nom du lot est requis' });
        }

        const data = { name, description, number_of_properties };

        const newLot = await lotsService.createNewLot(data);
        return res.status(201).json(newLot);
    } catch (error) {
        console.error('Erreur lors de la création du lot:', error);
        return res.status(500).json({ message: 'Erreur lors de la création du lot', error: error.message });
    }
};

exports.getAllLots = async (req, res) => {
    try {
        const lots = await lotsService.getAllLots();
        return res.status(200).json(lots);
    } catch (error) {
        console.error('Erreur lors de la récupération des lots:', error);
        return res.status(500).json({ message: 'Erreur lors de la récupération des lots', error: error.message });
    }
};

exports.getLotById = async (req, res) => {
    const { id } = req.params;

    try {
        const lot = await lotsService.getLotById(id);

        if (!lot) {
            return res.status(404).json({ message: 'Lot non trouvé' });
        }

        return res.status(200).json(lot);
    } catch (error) {
        console.error('Erreur lors de la récupération du lot:', error);
        return res.status(500).json({ message: 'Erreur lors de la récupération du lot', error: error.message });
    }
};

exports.updateLot = async (req, res) => {
    const { id } = req.params;
    const { name, description, number_of_properties } = req.body;

    try {
        const updatedLot = await lotsService.updateLot(id, { name, description, number_of_properties });

        if (!updatedLot) {
            return res.status(404).json({ message: 'Lot non trouvé' });
        }

        return res.status(200).json(updatedLot);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du lot:', error);
        return res.status(500).json({ message: 'Erreur lors de la mise à jour du lot', error: error.message });
    }
};

exports.deleteLot = async (req, res) => {
    const { id } = req.params;

    try {
        const lotDeleted = await lotsService.deleteLot(id);

        if (!lotDeleted) {
            return res.status(404).json({ message: 'Lot non trouvé' });
        }

        return res.status(200).json({ message: 'Lot supprimé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression du lot:', error);
        return res.status(500).json({ message: 'Erreur lors de la suppression du lot', error: error.message });
    }
};
