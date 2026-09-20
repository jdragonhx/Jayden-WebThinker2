let dojoBG;

function preload() {
    dojoBG = loadImage('assets/dojobackground.png');
    peach = {
        
    }
}

function setup() {
    createCanvas(800, 600);
    world.gravity.y = 10;
}

function draw() {
    image(dojoBG, 0, 0, width, height);
}