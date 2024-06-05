document.addEventListener('DOMContentLoaded', (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    const text1 = urlParams.get('text1');
    const text2 = urlParams.get('text2');
    const font = urlParams.get('font');
    const color = urlParams.get('color');

// Membatasi input pada textarea dengan id "text1" menjadi maksimal 17 karakter
document.getElementById('text1').addEventListener('input', function() {
    const maxLength = 27;
    if (this.value.length > maxLength) {
        this.value = this.value.slice(0, maxLength);
        alert('Maksimal 27 karakter cok!');
    }
});
    
    if (text1 || text2) {
        const displayTexts = document.getElementById('displayTexts');
        displayTexts.style.display = 'block';

        if (text1) {
            const marqueeText = document.getElementById('marqueeText');
            marqueeText.innerHTML = `<span>${text1}</span>`;
            if (font) marqueeText.style.fontFamily = font;
            if (color) marqueeText.style.color = color;
        }

        if (text2) {
            animateText('animatedText', text2);
            document.getElementById('listenButton').style.display = 'block';
        } else {
            document.getElementById('listenButton').style.display = 'none';
        }

        document.getElementById('form-container').style.display = 'none';
    }
});

function generateURL() {
    const text1 = document.getElementById('text1').value;
    const text2 = document.getElementById('text2').value;
    const font = document.getElementById('fontSelect').value;
    const color = document.getElementById('colorPicker').value;
    const baseURL = window.location.origin + window.location.pathname;
    const url = `${baseURL}?text1=${encodeURIComponent(text1)}&text2=${encodeURIComponent(text2)}&font=${encodeURIComponent(font)}&color=${encodeURIComponent(color)}`;
    document.getElementById('generatedURL').value = url;
}

function copyURL() {
    const urlField = document.getElementById('generatedURL');
    urlField.select();
    document.execCommand('copy');
    alert('URL disalin ke clipboard');
}

function animateText(elementId, text) {
    const element = document.getElementById(elementId);
    let index = 0;
    element.innerHTML = '';

    function typeWriter() {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeWriter, 50);
        }
    }

    typeWriter();
}

function speakText() {
    const text = document.getElementById('animatedText').innerText;
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
    } else {
        alert('Peramban Anda tidak mendukung fitur text-to-speech.');
    }
}

function updateTextStyle() {
    const font = document.getElementById('fontSelect').value;
    const color = document.getElementById('colorPicker').value;
    document.getElementById('text1').style.fontFamily = font;
    document.getElementById('text1').style.color = color;
}
