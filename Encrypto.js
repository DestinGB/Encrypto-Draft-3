// UI Elements
const tab = document.querySelectorAll('.nav');
const encrypt = document.getElementById('encryptTab');
const decrypt = document.getElementById('decryptTab');
const upload = document.querySelector('.upload-tab');
const upload2 = document.getElementById('uploadTab');
const encryptBtn = document.getElementById('encryptBtn');
const decryptBtn = document.getElementById('decryptBtn');
const fileSize = document.getElementById('filesize');
const fileName = document.getElementById('filename');
const fileSize2 = document.getElementById('filesize2');
const fileName2 = document.getElementById('filename2');
const fileInput = document.getElementById('fileInput');
const fileInput2 = document.getElementById('fileInput2');
const password = document.querySelector('.Password');
const password2 = document.getElementById('Password');
const validationInfo = document.querySelector('.validation-info');
const validationInfo2 = document.querySelector('.validation-info2');
const downloadsBtn = document.getElementById('downloads');
const downloadsTab = document.querySelector('.downloads-tab');
const enBtn = document.querySelector('.encrypt-btn');
const deBtn = document.querySelector('.decrypt-btn');
const about = document.getElementById('About');
const Information = document.getElementById('Information');
const back = document.getElementById('back');

// Encryption logic
async function fileToArrayBuffer(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}

async function encryptFile(file, password) {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(password),
        { name: "AES-GCM" },
        false,
        ["encrypt"]
    );
    const fileBuffer = await fileToArrayBuffer(file);
    const encrypted = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv },
        key,
        fileBuffer
    );
    const encryptedBytes = new Uint8Array(iv.byteLength + encrypted.byteLength);
    encryptedBytes.set(iv, 0);
    encryptedBytes.set(new Uint8Array(encrypted), iv.byteLength);
    return encryptedBytes;
}

async function decryptFile(encryptedBytes, password) {
    const iv = encryptedBytes.slice(0, 12);
    const data = encryptedBytes.slice(12);
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

// Encrypt button
enBtn.addEventListener('click', async () => {
    const file = fileInput.files[0];
    const password1 = password.value;

    if (!file) return alert('Add a file');
    if (!password1) return alert('Enter Password');

    const encrypted = await encryptFile(file, password1);
    const blob = new Blob([encrypted]);
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = file.name + ".enc";
    a.click();
});

// Decrypt button
deBtn.addEventListener('click', async () => {
    const file = fileInput2.files[0];
    const password1 = password2.value;

    if (!file) return alert('Add a file');
    if (!password1) return alert('Enter Password');

    const fileBuffer = await fileToArrayBuffer(file);
    try {
        const decryptedBlob = await decryptFile(new Uint8Array(fileBuffer), password1);
        const url = URL.createObjectURL(decryptedBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "decrypted_" + file.name.replace(".enc", "");
        a.click();
    } catch (e) {
        alert('Decryption failed. Wrong password or corrupted file.');
    }
});

// File name & size preview
fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file) {
        fileName.textContent = `File Name: ${file.name}`;
        fileSize.textContent = `File Size: ${(file.size / (1024 * 1024)).toFixed(2)}MB`;
    }
});

fileInput2.addEventListener('change', () => {
    const file = fileInput2.files[0];
    if (file) {
        fileName2.textContent = `File Name: ${file.name}`;
        fileSize2.textContent = `File Size: ${(file.size / (1024 * 1024)).toFixed(2)}MB`;
    }
});

// Tab switching
encryptBtn.addEventListener('click', () => {
    encrypt.style.display = 'block';
    decrypt.style.display = 'none';
    Information.style.display = 'none';
    downloadsTab.style.display = 'none';
});
decryptBtn.addEventListener('click', () => {
    encrypt.style.display = 'none';
    decrypt.style.display = 'block';
    Information.style.display = 'none';
    downloadsTab.style.display = 'none';
});
downloadsBtn.addEventListener('click', () => {
    encrypt.style.display = 'none';
    decrypt.style.display = 'none';
    Information.style.display = 'none';
    downloadsTab.style.display = 'block';
});
about.addEventListener('click', () => {
    encrypt.style.display = 'none';
    decrypt.style.display = 'none';
    Information.style.display = 'block';
    downloadsTab.style.display = 'none';
});
back.addEventListener('click', () => {
    encrypt.style.display = 'block';
    decrypt.style.display = 'none';
    Information.style.display = 'none';
    downloadsTab.style.display = 'none';
    tab.forEach(b => b.classList.remove('active'));
    encryptBtn.classList.add('active');
});
upload.addEventListener('click', () => fileInput.click());
upload2.addEventListener('click', () => fileInput2.click());

// UI tab indicator
tab.forEach(btn => {
    btn.addEventListener('click', () => {
        tab.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        localStorage.setItem('activeTab', btn.id);
    });
});

// Password validation
function checkPassword(pass) {
    let errors = [];
    if (pass.length < 8) errors.push('🔸Must contain at least 8 characters');
    if (!/[A-Z]/.test(pass)) errors.push('🔸Add Uppercase letter');
    if (!/[a-z]/.test(pass)) errors.push('🔸Add Lowercase letter');
    if (!/[0-9]/.test(pass)) errors.push('🔸Add a number');
    if (!/[^A-Za-z0-9]/.test(pass)) errors.push('🔸Add a symbol like(#?.!)');
    if (pass.length > 30) errors.push('🔸Password Too Long');
    if (["123456", "password", "qwerty", "1234"].includes(pass.toLowerCase())) {
        errors.push("🔸Don't use common passwords");
    }
    return errors.length === 0
        ? `<i style='color: #1db954;'> ✅Strong Password!</i>`
        : errors.map(e => `<div style="color: red">${e}</div>`).join('');
}

password.addEventListener('input', () => {
    validationInfo.innerHTML = checkPassword(password.value);
});
password2.addEventListener('input', () => {
    validationInfo2.innerHTML = checkPassword(password2.value);
});
