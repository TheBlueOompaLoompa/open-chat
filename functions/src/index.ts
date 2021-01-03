import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

admin.initializeApp();

let db = admin.firestore();

// HTTPS endpoint /gmpkey
export const getUserPubKey = functions.https.onRequest((req, res) => {  // Allow message sender to request the key public key of the user with the email passed in
    let userCollection = db.collection('users').limit(1);

    let query = userCollection.where("email", "==", req.body.email);

    query
        .get()
        .then(function(querySnapshot){
            let docData = querySnapshot.docs[0].data;
            res.send({ publicKey: docData().publicKey, uid: querySnapshot.docs[0].id });
        });
});