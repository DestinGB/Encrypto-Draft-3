//Tabs & Buttons Variables
const tab = document.querySelectorAll('.nav')
const encrypt = document.getElementById('encryptTab')
const decrypt = document.getElementById('decryptTab')
const upload = document.querySelector('.upload-tab')

const upload2 = document.getElementById('uploadTab')

const encryptBtn = document.getElementById('encryptBtn')
const decryptBtn = document.getElementById('decryptBtn')

// File Variables
const fileSize = document.getElementById('filesize')
const fileName = document.getElementById('filename')

const fileSize2 = document.getElementById('filesize2')
const fileName2 = document.getElementById('filename2')

const fileInput = document.getElementById('fileInput')
const fileInput2 = document.getElementById('fileInput2')

//password variables

const password = document.querySelector('.Password')
const password2 =document.getElementById('Password')
const validationInfo = document.querySelector('.validation-info')
const validationInfo2 = document.querySelector('.validation-info2')


//downloads sextion
const downloadsBtn = document.getElementById('downloads')
const downloadsTab = document.querySelector('.downloads-tab')


const enBtn = document.querySelector('.encrypt-btn')
const deBtn = document.querySelector('.decrypt-btn')

enBtn.addEventListener('click', () => {
    let file = fileInput.files[0]

    let password1 = password.value;

    if(!file){
        alert('Add a file')
    } else if(!password1){
        alert('Enter Password')
    }
})

deBtn.addEventListener('click', () => {
    let file = fileInput2.files[0]

    let password1 = password.value;

    if(!file){
        alert('Add a file')
    } else if(!password1){
        alert('Enter Password')
    }
})

downloadsBtn.addEventListener('click', () => {
     encrypt.style.display = 'none'
    decrypt.style.display = 'none'
    Information.style.display = 'none'
    downloadsTab.style.display = 'block'
})
//close downloads


//About Section
const about = document.getElementById('About')
const Information = document.getElementById('Information')
const back = document.getElementById('back')

// Switching To >> About Section

about.addEventListener('click', () => {
    encrypt.style.display = 'none'
    decrypt.style.display = 'none'
    Information.style.display = 'block'
    downloadsTab.style.display = 'none'
})

back.addEventListener('click', () => {
    encrypt.style.display = 'block'
    decrypt.style.display = 'none'
    Information.style.display = 'none'
    downloadsTab.style.display = 'none'
})

//close switch

//Downloads

upload.addEventListener('click', () => {
    fileInput.click();
})

upload2.addEventListener('click', () => {
    fileInput2.click();
})

tab.forEach(btn => {
    btn.addEventListener('click', () => {
        tab.forEach(b => b.classList.remove('active'))
        btn.classList.add('active')
        localStorage.setItem('activeTab', tab)
    })
})


const showFile = () => {
    let file = fileInput.files[0]

    if(file){
        fileName.textContent = `File Name: ${file.name}`
        fileSize.textContent = `File Size: ${(file.size/(1024 * 1024)).toFixed(2)}MB`
    }
}

fileInput.addEventListener('change', () => {
    showFile()
})

const showFiles = () => {
    let file = fileInput2.files[0]

    if(file){
        fileName2.textContent = `File Name: ${file.name}`
        fileSize2.textContent = `File Size: ${(file.size/(1024 * 1024)).toFixed(2)}MB`
    }
}

fileInput2.addEventListener('change', () => {
    showFiles()
})

encryptBtn.addEventListener('click', () => {
    encrypt.style.display = 'block'
    decrypt.style.display = 'none'
    Information.style.display = 'none'
    downloadsTab.style.display = 'none'
})

decryptBtn.addEventListener('click', () => {
    encrypt.style.display = 'none'
    decrypt.style.display = 'block'
    Information.style.display = 'none'
    downloadsTab.style.display = 'none'
})


//Password One Validation
password.addEventListener('input', () => {
    let pass = password.value;

    validationInfo.innerHTML = checkPassword(pass)
})



function checkPassword(pass){

    let errors = []

    if(pass.length < 8){
        errors.push('🔸Must contain at least 8 characters')
    }

    if(!/[A-Z]/.test(pass)){
        errors.push('🔸Add Uppercase letter')
    }

    if(!/[a-z]/.test(pass)){
        errors.push('🔸Add Lowercase letter')
    }

    if(!/[0-9]/.test(pass)){
        errors.push('🔸Add a number')
    }

    if(!/[^A-Za-z0-9]/.test(pass)){
        errors.push('🔸Add a symbol like(#?.!)')
    }

    if(pass.length > 30){
        errors.push('🔸Password Too Long')
    }
    if(["123456", "password", "qwerty", "1234"].includes(pass.toLowerCase())){
        errors.push("🔸Don't use common passwords")
    }
    return errors.length === 0
    ? `<i style='color: #1db954;'> ✅Strong Password!</i>`: errors.map(e => `<div
         style="color: red">${e}</div>`).join('')
}

//  Password 2 Validation
password2.addEventListener('input', () => {
    let passe = password2.value

    validationInfo2.innerHTML = checkPassword(passe)
})

function checkPassword(passe){

    let errors = []

    if(passe.length < 8){
        errors.push('🔸Must contain at least 8 characters')
    }

    if(!/[A-Z]/.test(passe)){
        errors.push('🔸Add Uppercase letter')
    }

    if(!/[a-z]/.test(passe)){
        errors.push('🔸Add Lowercase letter')
    }

    if(!/[0-9]/.test(passe)){
        errors.push('🔸Add a number')
    }

    if(!/[^A-Za-z0-9]/.test(passe)){
        errors.push('🔸Add a symbol like(#?.!)')
    }

    if(passe.length > 30){
        errors.push('🔸Password Too Long')
    }
    if(["123456", "password", "qwerty", "1234"].includes(passe.toLowerCase())){
        errors.push("🔸Don't use common passwords")
    }
    return errors.length === 0
    ? `<i style='color: #1db954;'> ✅Strong Password!</i>`: errors.map(e => `<div
         style="color: red">${e}</div>`).join('')
}