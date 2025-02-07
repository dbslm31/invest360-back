const sciService = require("./sciService");

exports.createSci = async (req, res, next) => {
    try {
        const { name, siret, address, capital, creation_date, user_id, status } = req.body;

        if (!name || !siret || !address || !capital || !user_id || !creation_date) {
            return res.status(400).json({ message: 'Champs requis manquants' });
        }

        const data = { name, siret, address, capital, creation_date, user_id, status };
        const newSci = await sciService.createNewSci(data);

        return res.status(201).json(newSci);
    } catch (error) {
        console.error('Erreur lors de la création de la SCI:', error);
        return res.status(500).json({ message: 'Erreur lors de la création de la SCI', error: error.message });
    }
};

exports.getAllScis = async (req, res, next) => {
    try {
        const scis = await sciService.getAllScis();
        return res.status(200).json(scis);
    } catch (error) {
        console.error('Erreur lors de la récupération des SCI:', error);
        return res.status(500).json({ message: 'Erreur lors de la récupération des SCI', error: error.message });
    }
};

exports.getSciById = async (req, res, next) => {
    try {
        const sci = await sciService.getSciById(req.params.id);
        return res.status(200).json(sci);
    } catch (error) {
        console.error('Erreur lors de la récupération de la SCI:', error);
        return res.status(500).json({ message: 'Erreur lors de la récupération de la SCI', error: error.message });
    }
};

exports.updateSci = async (req, res, next) => {
    try {
        const updatedSci = await sciService.updateSci(req.params.id, req.body);
        return res.status(200).json(updatedSci);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la SCI:', error);
        return res.status(500).json({ message: 'Erreur lors de la mise à jour de la SCI', error: error.message });
    }
};

exports.archiveSci = async (req, res, next) => {
    try {
        const archivedSci = await sciService.archiveSci(req.params.id);
        return res.status(200).json(archivedSci);
    } catch (error) {
        console.error('Erreur lors de l\'archivage de la SCI:', error);
        return res.status(500).json({ message: 'Erreur lors de l\'archivage de la SCI', error: error.message });
    }
};
