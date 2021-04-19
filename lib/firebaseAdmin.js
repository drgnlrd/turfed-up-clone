const admin = require("firebase-admin");
const serviceAccount = require("../secrets.json");

export const verifyIdToken = async (token) => {
    if(!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://turfedup-1a8ee-default-rtdb.firebaseio.com/" ,
        });
    }

    try {
        return admin
            .auth()
            .verifyIdToken(token);
    } catch (error) {
        throw error;
    }
};