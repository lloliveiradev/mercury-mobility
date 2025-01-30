const functions = require("firebase-functions");
const { getFirestore } = require('firebase-admin/firestore');
const { initializeApp, cert } = require("firebase-admin/app");

//Repository
const credentials = require('../firebase/credentials.json');
const env = require('./env.js');
env.fs = initializeApp({ credential: cert(credentials) });
env.fs.firestore = getFirestore();

// Middlewares
const auth = require("./middlewares/auth");

//Routes
const mobilityRoutes = require('./routes/mobility.js');
const defaultRoutes = require('./routes/index.js');

//Endpoints
exports.mobility = functions.https.onRequest((req, res) =>
    auth({ req, res, env, next: mobilityRoutes })
);
exports.displacement = functions.https.onRequest((req, res) =>
    auth({ req, res, env, controller: 'displacement', next: defaultRoutes })
);