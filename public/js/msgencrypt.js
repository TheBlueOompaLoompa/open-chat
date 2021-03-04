const bits = 4096;

function genKey(password){

    let keypair = await crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: bits,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256"
        },
        true,
        ["encrypt", "decrypt"]
    );

    const public = await crypto.subtle.exportKey("jwk", keyPair.publicKey);
    const private = await crypto.subtle.exportKey("jwk", keyPair.privateKey);

    return { private, public };
}

function encryptMessage(keyobj, message){
    const key = await crypto.subtle.importKey("jwk", keyobj, "RSA-OAEP", true, ["encrypt"]);
    let encrypted =  await crypto.subtle.encrypt("RSA-OAEP", key, str2ab(message));
    return ab2str(encrypted);
}

function decryptMessage(keyobj, encryptedMessage){
    const key = await crypto.subtle.importKey("jwk", keyobj, "RSA-OAEP", true, ["decrypt"]);
    let decrypted = await crypto.subtle.decrypt("RSA-OAEP", key, str2ab(encryptedMessage));
    return str2ab(decrypted);
}