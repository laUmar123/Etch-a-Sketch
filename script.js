'use strict'

const gridContainer = document.querySelector('.container');
const slider = document.querySelector('#size-range');
const sliderValue = document.querySelector('.slider-output');
const clearButton = document.querySelector('.clear-button');
const buttonsContainer = document.querySelector('.buttons-container')
const buttons = document.querySelectorAll('.btn');
const defaultButton = document.querySelector('.default-button');
const rainbowButton = document.querySelector('.rainbow-button');
const colorSelector = document.querySelector('.color-select-button');
const colorChoice = document.querySelector('#color-selector');
const eraseButton = document.querySelector('.eraser-button');

// Generate a number between 1-255
function randomNumGen() {
    return Math.floor(Math.random() * (255 - 1) + 1) + 1;
}

// Using the randomNumGen we generate a number between 1-255 for each rgb value
function randomColGen() {
    return `rgb(${randomNumGen()}, ${randomNumGen()}, ${randomNumGen()})`
}

function makeRows(rows, cols) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            //set the width and height to be 600 (size of container) / number of rows and cols desired
            cell.style.width = `${(600 / cols)}px`;
            cell.style.height = `${(600 / rows)}px`;
            gridContainer.append(cell); //adds the div into gridContainer as a child element
        }
    }
};

function defaultBehaviour(color) {
    gridContainer.addEventListener('mouseover', function (e) {
        if (!e.target.classList.contains('cell')) return; //every cell contains the .cell class, so if it isn't present we dont do anything
        else { //if the class is present we know we're hovering over a cell so the background color is changed
            e.target.style.backgroundColor = color;
        }
    });
}

function clearGrid() {
    const cells = document.querySelectorAll('.cell'); //each cell contains the cell class so we select all of them
    cells.forEach(cell => cell.remove()); //remove each div
}

makeRows(16, 16); //by default 16 x 16 grid created
defaultBehaviour("grey"); //by default the default button is active, so the colour displayed should be grey

//updating slider
slider.addEventListener('input', function (e) {
    sliderValue.innerText = `Grid size: ${e.target.value} x ${e.target.value}`; //changes value to display grid size
    clearGrid(); //clears the grid there's no overflow
    makeRows(e.target.value, e.target.value); //generates a grid of the desired size
})


//This event listener uses event delegation to change the appearnace of a clicked button, giving the illusion of it being active
buttonsContainer.addEventListener('click', function (e) {
    if (!e.target.classList.contains('btn')) return; //checks if the element pressed has the class btn
    else {
        buttons.forEach(btn => btn.classList.remove('active')); //removes the active class from all buttons
        e.target.classList.add('active'); //adds it to the button that has been pressed
    }
});

//These event listeners are to do with functionality of the grid
defaultButton.addEventListener('click', function () {
    defaultBehaviour("grey");
});

rainbowButton.addEventListener('click', function () {
    gridContainer.addEventListener('mouseover', function (e) {
        if (!e.target.classList.contains('cell')) return; //every cell contains the .cell class, so if it isn't present we dont do anything
        else { //if the class is present we know we're hovering over a cell so the background color is changed
            e.target.style.backgroundColor = randomColGen();
        }
    });
});

colorSelector.addEventListener('click', function () {
    gridContainer.addEventListener('mouseover', function (e) {
        if (!e.target.classList.contains('cell')) return; //every cell contains the .cell class, so if it isn't present we dont do anything
        else { //if the class is present we know we're hovering over a cell so the background color is changed
            e.target.style.backgroundColor = colorChoice.value;
        }
    });
});

eraseButton.addEventListener('click', function () {
    defaultBehaviour("white");
});

clearButton.addEventListener('click', function () {
    clearGrid();
    makeRows(slider.value, slider.value);
});


