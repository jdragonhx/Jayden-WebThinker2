function preload() {
    dojoBG = loadImage("assets/dojo_background.png");
}

function setup() {
    createCanvas(800, 600);
    fruitninja = new FruitNinja();
    fruitninja.setup();
}