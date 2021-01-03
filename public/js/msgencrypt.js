function genKey(password){
    const bits = 2048;

    let RSAkey = cryptico.generateRSAKey(password, bits);

    return { privateKey: RSAkey, publicKey: cryptico.publicKeyString(RSAkey) };
}

function encryptMessage(publicKey, message){
    return cryptico.encrypt(message, publicKey);
}

function decryptMessage(privateKey, encryptedMessage){
    return cryptico.decrypt(encryptedMessage, privateKey);
}