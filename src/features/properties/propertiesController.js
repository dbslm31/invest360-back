const propertiesService = require('./propertiesService');

// Create a property
exports.createProperty = async (req, res, next) => {
    try {
        const {
            name,
            description,
            area,
            type,
            address,
            furnished,
            rented,
            is_archived,
            user_id,
            price,
            lot_id
        } = req.body;

        // Vérification des champs requis
        if (!name || !type || !user_id || !price) {
            return res.status(400).json({ message: 'Champs requis manquants' });
        }

        const data = {
            name,
            description,
            area,
            type,
            address,
            furnished,
            rented,
            is_archived,
            user_id,
            price,
            lot_id
        };

        const property = await propertiesService.createNewProperty(data);
        return res.status(201).json(property);
    } catch (error) {
        console.error('Erreur lors de la création du bien:', error);
        return res.status(500).json({ message: 'Erreur lors de la création du bien', error: error.message });
    }
};


// Fetch all properties by userId
exports.getPropertiesByUserId = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const properties = await propertiesService.getByUserId(userId);
        return res.status(200).json(properties);
    } catch (error) {
        console.error(`Erreur lors de la récupération des biens pour l'utilisateur ${userId}:`, error);
        return res.status(500).json({ error: `Erreur lors de la récupération des biens pour l'utilisateur ${userId}` });
    }
};

// Fetch all properties (admin)
exports.getAllProperties = async (req, res, next) => {
    try {
        const properties = await propertiesService.getAll();
        return res.status(200).json(properties);
    } catch (error) {
        console.error('Erreur lors de la récupération des biens:', error);
        return res.status(500).json({ error: 'Erreur lors de la récupération des biens' });
    }
};

// Fetch a property by ID
exports.getPropertyById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const property = await propertiesService.getPropertyById(id);
        if (property) {
            return res.status(200).json(property); // Corrected variable name to `property`
        } else {
            return res.status(404).send(`Le bien n'existe pas`);
        }
    } catch (error) {
        console.error(`Erreur lors de la récupération du bien ${id}:`, error);
        return res.status(500).json({ error: `Erreur lors de la récupération du bien ${id}` });
    }
};

// Update property information
exports.updateProperty = async (req, res, next) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        const updatedProperty = await propertiesService.updateProperty(id, updatedData);
        if (updatedProperty) {
            return res.status(200).json(updatedProperty);
        } else {
            return res.status(404).send(`Le bien n'existe pas`);
        }
    } catch (error) {
        console.error(`Erreur lors de la modification du bien ${id}:`, error);
        return res.status(500).json({ error: `Erreur lors de la modification du bien ${id}` });
    }
};

// Archive property by ID
exports.archiveProperty = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await propertiesService.archiveProperty(id);
        if (result) {
            return res.status(204).send(); // 204 No Content should not have a message body
        } else {
            return res.status(404).send(`Le bien n'existe pas`);
        }
    } catch (error) {
        console.error(`Erreur lors de l'archivage du bien ${id}:`, error);
        return res.status(500).json({ error: `Erreur lors de l'archivage du bien ${id}` });
    }
};
