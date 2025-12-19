const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const output = document.getElementById('output');

upload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            output.textContent = extractLSB(imageData.data);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

function extractLSB(data) {
    let bitString = "";
    for (let i = 0; i < data.length; i += 4) {
        bitString += (data[i] & 1);
        bitString += (data[i+1] & 1);
        bitString += (data[i+2] & 1);
    }

    let message = "";
    for (let i = 0; i < bitString.length; i += 8) {
        const charCode = parseInt(bitString.slice(i, i + 8), 2);
        
        if (charCode === 10 || charCode === 13) {
            message += "\n"; // Salto de línea real
        } else if (charCode >= 32 && charCode <= 126) {
            message += String.fromCharCode(charCode);
        }
        if (message.length > 5000) break;
    }

    // Si el mensaje tiene contenido, lo limpiamos de espacios raros al final
    return message.trim() || "No se encontró texto legible.";
}
