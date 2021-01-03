import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

// HTTPS endpoint /gmpkey
export const getUserPubKey = functions.https.onRequest((req, res) => {  // Allow message sender to request the key public key of the user with the email passed in
    admin.initializeApp();

    let db = admin.firestore();

    let userCollection = db.collection('users');

    let query = userCollection.where("email", "==", req.body.email);

    query
        .get()
        .then(function(querySnapshot){
            let docData = querySnapshot.docs[0].data;
            res.send({ publicKey: docData().publicKey, uid: querySnapshot.docs[0].id });
        });
});

export const setupUserDocment = functions.auth.user().onCreate(user => {
    admin.initializeApp();

    let db = admin.firestore();

    let userCollection = db.collection('users');

    if(user.emailVerified === true){
        userCollection.doc(user.uid).create({
            email: user.email,
            icon: user.photoURL,
            name: user.displayName
        });
    }
});