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
    // Extraemos el bit menos significativo de los canales R, G y B
    for (let i = 0; i < data.length; i += 4) {
        bitString += (data[i] & 1);     // Rojo
        bitString += (data[i+1] & 1);   // Verde
        bitString += (data[i+2] & 1);   // Azul
    }

    let message = "";
    for (let i = 0; i < bitString.length; i += 8) {
        const byte = bitString.slice(i, i + 8);
        const charCode = parseInt(byte, 2);
        
        if ((charCode >= 32 && charCode <= 126) || charCode === 10 || charCode === 13) {
            message += String.fromCharCode(charCode);
        }

        // Detener si el mensaje es demasiado largo (evita que la web se congele)
        if (message.length > 5000) break;
    }
    
    return message || "No se encontró texto legible o la imagen está vacía.";
}
