// src/backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connexion MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie"))
  .catch(err => console.error("Erreur de connexion à MongoDB :", err));


// Routes d'authentification
app.use('/api/auth', authRoutes);

// Utilisation des routes des utilisateurs
app.use('/api/users', userRoutes);  // Utilisation des routes des utilisateurs

// Utilisation des routes des utilisateurs
app.use('/api/categories', categoryRoutes);  // Utilisation des routes des utilisateurs


// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
