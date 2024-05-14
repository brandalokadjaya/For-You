document.addEventListener('DOMContentLoaded', (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    const text1 = urlParams.get('text1');
    const text2 = urlParams.get('text2');

    if (text1 || text2) {
        const displayTexts = document.getElementById('displayTexts');
        displayTexts.style.display = 'block';
        
        if (text1) {
            const marqueeText = document.getElementById('marqueeText');
            marqueeText.innerHTML = `<span>${text1}</span>`;
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
    const baseURL = window.location.origin + window.location.pathname;
    const url = `${baseURL}?text1=${encodeURIComponent(text1)}&text2=${encodeURIComponent(text2)}`;
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