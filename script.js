const canvas = document.querySelector(".canvas");
const canvasWidth = canvas.clientWidth;
const canvasHeight = canvas.clientHeight;


createGrid(16);


canvas.addEventListener("mouseover", function (e) {
    if (e.target.matches(".pixel")) {
        colorPixel(e);
    }
})


function colorPixel(event) {
    let opacity = Number(event.target.style.opacity);
    opacity += .1;
    opacity = (opacity > 1) ? 1 : opacity;
    event.target.style.opacity = `${opacity}`;
}


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
    pixel.classList.add("pixel");
    pixel.style.width = `${pixelWidth}px`;
    pixel.style.height = `${pixelHeight}px`;
    pixel.style.backgroundColor = "black";
    pixel.style.opacity = "0%"
    canvas.appendChild(pixel);
}