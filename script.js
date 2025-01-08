const canvas = document.querySelector(".canvas");
const canvasWidth = canvas.clientWidth;
const canvasHeight = canvas.clientHeight;
const btnlist = document.querySelectorAll("button");
const settingBtnsDiv = document.querySelector(
    ".setting-btns-container");
const sizeForm = document.querySelector("form");
const currentSizeSpan = document.querySelector("#current-size");



let colorBlack = true;
createGrid(16);



sizeForm.addEventListener("submit", function (e) {
    e.preventDefault();
    changeGridSize(e);
})


btnlist.forEach(function (btn) {
    btn.addEventListener("mouseover", function (e) {
        btn.classList.toggle("btn-hover");
    })
})


btnlist.forEach(function (btn) {
    btn.addEventListener("mouseout", function (e) {
        btn.classList.toggle("btn-hover");
    })
})


canvas.addEventListener("mouseover", function (e) {
    if (e.target.matches(".pixel")) {
        colorPixel(e);
    }
})


settingBtnsDiv.addEventListener("click", function (e) {
    if (e.target.matches("#clear-btn")) {
        eraseGridPixels()
    } else if (e.target.matches("#color-mode-btn")) {
        changeColorMode();
    }
})



function changeColorMode() {
    colorBlack = !colorBlack;
    changeGridPixelColor()
}


function changeGridPixelColor() {
    for (let i = 0; i < canvas.children.length; i += 1) {
        const pixel = canvas.children[i];
        if (colorBlack) {
            pixel.style.backgroundColor = "black";
        } else {
            pixel.style.backgroundColor = getRandomRGBValue();
        }
    }
}


function eraseGridPixels() {
    for (let i = 0; i < canvas.children.length; i += 1) {
        const pixel = canvas.children[i];
        pixel.style.opacity = "0";
    }
}


function changeGridSize(event) {
    const formData = new FormData(sizeForm);
    let size = formData.get("size").trim();
    sizeForm.reset();
    if (!isValidInput(size)) {
        return;
    }
    let cleanedSize = Math.round(parseInt(size));
    clearGrid();
    createGrid(cleanedSize);
    updateCurrentSizeText(cleanedSize);
}


function updateCurrentSizeText(size) {
    currentSizeSpan.textContent = size;
}


function clearGrid() {
    while (canvas.firstChild !== null) {
        canvas.removeChild(canvas.lastChild);
    }
}


function isValidInput(input) {
    if (input === "") {
        alert("Please enter a number");
        return false;
    }
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
    let colorValue;
    if (colorBlack) {
        colorValue = "black";
    } else {
        colorValue = getRandomRGBValue();
    }
    pixel.style.backgroundColor = colorValue;
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
    return Math.floor(Math.random() * number + 1);
}