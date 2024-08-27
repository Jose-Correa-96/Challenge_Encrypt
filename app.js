const inputText = document.getElementById('input-text');
const encryptBtn = document.getElementById('encrypt-btn');
const decryptBtn = document.getElementById('decrypt-btn');
const resultImage = document.getElementById('result-image');
const resultTitle = document.getElementById('result-title');
const resultDescription = document.getElementById('result-description');
const resultText = document.getElementById('result-text');
const copyBtn = document.getElementById('copy-btn');


const encryptionMap = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat'
};

const themeToggle = document.getElementById('theme-toggle');
const animatedBgToggle = document.getElementById('animated-bg-toggle');
const animatedBackground = document.getElementById('animated-background');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDarkTheme = document.body.classList.contains('dark-theme');
    themeToggle.innerHTML = isDarkTheme ? '<i class="fas fa-sun"></i> Light Mode' : '<i class="fas fa-moon"></i> Dark Mode';
});

animatedBgToggle.addEventListener('click', () => {
    animatedBackground.style.display = animatedBackground.style.display === 'none' ? 'block' : 'none';
    animatedBgToggle.innerHTML = animatedBackground.style.display === 'none' ? '<i class="fas fa-paint-brush"></i> Animated BG' : '<i class="fas fa-times"></i> Remove BG';
    
    if (animatedBackground.style.display === 'block') {
        createStars(100); // Número de estrellas
    } else {
        animatedBackground.innerHTML = ''; // Limpia las estrellas si el fondo se desactiva
    }
});

function createStars(numStars) {
    for (let i = 0; i < numStars; i++) {
        let star = document.createElement('div');
        star.classList.add('star');
        star.style.left = Math.random() * 100 + 'vw';
        star.style.animationDuration = Math.random() * 5 + 5 + 's';
        star.style.animationDelay = Math.random() * 5 + 's';
        animatedBackground.appendChild(star);
    }
}

const decryptionMap = Object.fromEntries(
    Object.entries(encryptionMap).map(([key, value]) => [value, key])
);

function validateInput(text) {
    return /^[a-z\s]*$/.test(text);
}

function processText(text, map) {
    return text.replace(new RegExp(Object.keys(map).join('|'), 'g'), match => map[match]);
}

function updateResult(title, description, text, imageSrc) {
    resultTitle.textContent = title;
    resultDescription.textContent = description;
    resultText.value = text;
    resultImage.src = imageSrc;
    resultText.style.display = text ? 'block' : 'none';
    copyBtn.style.display = text ? 'inline-block' : 'none';
}

function handleEncryptDecrypt(isEncrypt) {
    const text = inputText.value.trim();
    
    if (!text) {
        swal('Ups!', 'Por favor ingresa algún texto', 'warning');
        return;
    }
    
    if (!validateInput(text)) {
        swal('Texto Invalido', 'Utilice únicamente letras minúsculas y sin acentos.', 'error');
        return;
    }
    
    const processedText = isEncrypt ? processText(text, encryptionMap) : processText(text, decryptionMap);
    const action = isEncrypt ? 'cifrado' : 'descifrado';
    const image = isEncrypt ? 'desencriptado' : 'encriptado';
    
    updateResult(
        `Texto ${action} exitosamente`,
        '',
        processedText,
        `img/${image}.jpg`
    );
}

encryptBtn.addEventListener('click', () => handleEncryptDecrypt(true));
decryptBtn.addEventListener('click', () => handleEncryptDecrypt(false));

copyBtn.addEventListener('click', () => {
    resultText.select();
    document.execCommand('copy');
    swal('¡Copiado!', 'El texto ha sido copiado a tu portapapeles.', 'success');    
});

inputText.addEventListener('input', () => {
    if (inputText.value.trim() === '') {
        updateResult('No se encontró ningún mensaje', 'Introduzca un texto para cifrar o descifrar', '', 'img/waiting.svg');
    }
});