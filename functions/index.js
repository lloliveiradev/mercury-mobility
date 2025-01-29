const auth = require("./middlewares/auth");
const functions = require("firebase-functions");
const { getFirestore } = require('firebase-admin/firestore');
const { initializeApp } = require("firebase-admin/app");

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

//Repository
const cred = require('../firebase/credentials.js');
const env = require('./env.js');
const db = initializeApp(cred);
db.firestore = () => { return getFirestore(db) };

//Routes
const mobilityRoutes = require('./routes/mobility.js');
const defaultRoutes = require('./routes/index.js');

//Endpoints
exports.mobility = functions.https.onRequest((req, res) => auth({ req, res, db, env, next: mobilityRoutes }));
exports.displacement = functions.https.onRequest((req, res) => auth({ req, res, db, env, controller: 'displacement', next: defaultRoutes }));