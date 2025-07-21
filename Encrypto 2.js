function fileToArrayBuffer(file){
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result)
        reader.readAsArrayBuffer(file)
    })
}

async function encryptFile(file, password){
    const iv = crypto.getRandomValues(new Uint8Array(12));

    const key = await crypto.subtle.importKey("raw",
        new TextEncoder().encode(password),
        {
            name: "AES-GCM"
        },
        false,
        ["encrypt"]
    );

    const fileBuffer = await fileToArrayBuffer(file);

    const encrypted = await crypto.subtle.encrypt(
        {name: "AES-GCM", iv: iv},
        key,
        fileBuffer
    );

    const encryptedBytes = new Uint8Array(iv.byteLength + encrypted.byteLength);
     encryptedBytes.set(iv, 0);
     encryptedBytes.set(new Uint8Array(encrypted), iv.byteLength);

     return encryptedBytes;
}

//Decryption

async function decryptFile(encryptedBytes, password) {
    const iv = encryptedBytes.slice(0, 12); // first 12 bytes
    const data = encryptedBytes.slice(12); // the rest

    const key = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(password),
        { name: "AES-GCM" },
        false,
        ["decrypt"]
    );

    const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: iv },
        key,
        data
    );

    return new Blob([decrypted]);
}
