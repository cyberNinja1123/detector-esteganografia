# 🔍 Analizador de Esteganografía LSB

Esta es una herramienta web sencilla diseñada para detectar y extraer mensajes ocultos en imágenes utilizando la técnica de **Least Significant Bit (LSB)**. 

Ideal para retos de CTF (Capture The Flag), juegos de acertijos o simplemente para explorar cómo se oculta información en archivos digitales.

## 🚀 Cómo usarlo
1. Entra al enlace de **GitHub Pages** de este proyecto.
2. Haz clic en el botón "Sube una imagen".
3. Selecciona un archivo de imagen (preferiblemente `.png` o `.bmp`).
4. El sistema analizará automáticamente los bits menos significativos de los canales Rojo, Verde y Azul (RGB).
5. Si existe un mensaje en texto plano (ASCII), aparecerá en el cuadro de resultados.

## 🛠️ ¿Cómo funciona?
La herramienta recorre cada píxel de la imagen y extrae el último bit de cada canal de color. 



* Si un valor de color es **255** (binario `11111111`), el LSB es **1**.
* Si un valor de color es **254** (binario `11111110`), el LSB es **0**.

El script agrupa estos bits en bloques de 8 para reconstruir caracteres de texto.

## ⚠️ Notas importantes
* **Privacidad:** Todo el procesamiento ocurre localmente en tu navegador. Tu imagen nunca se sube a ningún servidor.
* **Formatos:** Funciona mejor con formatos sin pérdida como **PNG**. Las imágenes **JPG** suelen corromper los mensajes ocultos debido a su algoritmo de compresión.
* **Cifrado:** Si el mensaje fue cifrado antes de ser ocultado, verás caracteres aleatorios o "ruido".

---
Desarrollado con ❤️ para ayudar en la resolución de acert
