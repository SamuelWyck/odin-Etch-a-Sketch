const canvas = document.querySelector(".canvas");
const canvasWidth = canvas.clientWidth;
const canvasHeight = canvas.clientHeight;
const btn = document.querySelector("#grid-size-btn");
const sizeForm = document.querySelector("form");
const currentSizeSpan = document.querySelector("#current-size");



createGrid(16);



sizeForm.addEventListener("submit", function (e) {
    e.preventDefault();
    changeGridSize(e);
})


btn.addEventListener("mouseover", function (e) {
    btn.classList.toggle("btn-hover");
})


btn.addEventListener("mouseout", function (e) {
    btn.classList.toggle("btn-hover");
})


canvas.addEventListener("mouseover", function (e) {
    if (e.target.matches(".pixel")) {
        colorPixel(e);
    }
})



function changeGridSize(event) {
    const formData = new FormData(sizeForm);
    let size = formData.get("size").trim();
    sizeForm.reset();
    if (!isValidInput(size)) {
        return;
    }
    let cleanedSize = Math.round(parseInt(size));
    clearCanvas();
    createGrid(cleanedSize);
    updateCurrentSizeText(cleanedSize);
}


function updateCurrentSizeText(size) {
    currentSizeSpan.textContent = size;
}


function clearCanvas() {
    while (canvas.firstChild !== null) {
        canvas.removeChild(canvas.lastChild);
    }
}


function isValidInput(input) {
    if (isNaN(input)) {
        alert("Please enter a number");
        return false;
    }
    let intInput = Math.round(parseInt(input));
    if (intInput > 100 || intInput < 1) {
        alert("Please enter a valid number");
        return false;
    }
    return true;
}


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
    pixel.style.opacity = "0"
    canvas.appendChild(pixel);
}


function getRandomRGBValue() {
    const red = randomIntUpTo(255);
    const green = randomIntUpTo(255);
    const blue = randomIntUpTo(255);
    return `rgb(${red}, ${green}, ${blue})`
}


function randomIntUpTo(number) {
    return Math.floor(Math.random() * num + 1);
}