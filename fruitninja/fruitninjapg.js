let dojoBG;
let peach;
let watermelon;
let fruitTypes =[]

function preload() {
    dojoBG = loadImage('assets/dojobackground.png');
    peach = {
        whole: loadImage('assets/peach.png')
    };
    watermelon = {
        whole: loadImage('assets/watermelon.png')
    };
    fruitTypes = [peach, watermelon];
}

function setup() {
    createCanvas(800, 600);
    world.gravity.y = 10;
}

function draw() {
    image(dojoBG, 0, 0, width, height);
}