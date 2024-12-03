const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB connecté : ${conn.connection.host}`.cyan.underline.bold);
    } catch (error) {
        console.error(`Erreur de connexion à MongoDB : ${error.message}`.red);
        process.exit(1); // Arrête le serveur si la connexion échoue
    }
};

module.exports = connectDB;
