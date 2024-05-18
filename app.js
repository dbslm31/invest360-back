const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();
require("dotenv").config({
    path: process.env.NODE_ENV === "production" ? ".env.prod" : ".env.dev",
});

const port = process.env.PORT;

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

//Routes management
const routes = [

];

routes.forEach((route) => require(route)(app));

router.get("/", (req, res) => {
    res.json({
        success: true,
        env: "main",
        version: "1.1.0",
    });
});

// Test route
app.get('/', (req, res) => {
    res.send('The server is running! 🏃');
});

// Starting server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
