const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();
require("dotenv").config({
    path: process.env.NODE_ENV === "production" ? ".env.prod" : ".env.dev",
});
const port = process.env.PORT || 3000;  // Ajout d'une valeur par défaut

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`Requête reçue sur ${req.path}`);
    next();
});

// Middleware CORS
app.use(
    cors({
        origin: "*",
        optionsSuccessStatus: 200,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        credentials: true,
    })
);

// Middleware to analyse request body
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb", parameterLimit: 50000 }));

// Routes management
const authRoutes = require("./src/features/auth/authRoutes")
const userRoutes = require("./src/features/users/userRoutes");
const propertyRoutes = require("./src/features/properties/propertiesRoutes")
const lotsRoutes = require("./src/features/lots/lotsRoutes")
const { useActionData } = require('react-router-dom');

app.use('/auth', authRoutes);
app.use('/user', userRoutes)
app.use('/property', propertyRoutes)
app.use('/lots', lotsRoutes)


// Main route
router.get("/", (req, res) => {
    res.json({
        success: true,
        env: process.env.NODE_ENV || "development",  // Utilisation de la variable d'environnement
        version: "1.1.0",
    });
});

app.use("/", router);

// Test route
app.get('/test', (req, res) => {
    res.send('The server is running! 🏃');
});

// Starting server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
