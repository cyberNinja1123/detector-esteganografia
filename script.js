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
    // Extraemos bits de R, G y B
    for (let i = 0; i < data.length; i += 4) {
        bitString += (data[i] & 1);     // Red
        bitString += (data[i+1] & 1);   // Green
        bitString += (data[i+2] & 1);   // Blue
    }

    let message = "";
    for (let i = 0; i < bitString.length; i += 8) {
        const charCode = parseInt(bitString.slice(i, i + 8), 2);
        
        // 32-126 son caracteres normales. 
        // 10 es Salto de línea (\n) y 13 es Retorno de carro (\r)
        if ((charCode >= 32 && charCode <= 126) || charCode === 10 || charCode === 13) {
            message += String.fromCharCode(charCode);
        }

        // Límite de seguridad para no bloquear el navegador
        if (message.length > 5000) break;
    }
    
    return message || "No se encontró contenido legible.";
}
