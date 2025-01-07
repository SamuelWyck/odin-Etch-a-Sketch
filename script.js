const canvas = document.querySelector(".canvas");
const canvasWidth = canvas.clientWidth;
const canvasHeight = canvas.clientHeight;


createGrid(16);






function createGrid(size) {
    const pixelWidth = canvasWidth / size;
    const pixelHeight = canvasHeight / size;
    const totalPixels = size * size;
    for (let i = 0; i < totalPixels; i += 1) {
        createPixel(pixelWidth, pixelHeight);
    }
};


function createPixel(pixelWidth, pixelHeight) {
    const pixel = document.createElement("div");
    pixel.classList.toggle(".grid-pixel");
    pixel.style.width = `${pixelWidth}px`;
    pixel.style.height = `${pixelHeight}px`;
    pixel.style.backgroundColor = "white";
    canvas.appendChild(pixel);
}