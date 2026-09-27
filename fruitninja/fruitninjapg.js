let dojoBG;
let peach;
let watermelon;
let fruitTypes = [];
let fruitGroup;
let fruit;

function preload() {
    dojoBG = loadImage('assets/dojobackground.png');
    peach = {
        whole: loadImage('assets/peachwhole.png')
    };
    watermelon = {
        whole: loadImage('assets/watermelonwhole.png')
    };
    fruitTypes = [peach, watermelon];
}

function setup() {
    createCanvas(800, 600);
    world.gravity.y = 10;
}

function draw() {
    image(dojoBG, 0, 0, width, height);
    if (frameCount % 120 === 0) {
        spawnFruit();
    }

}

function spawnFruit() {
    let fruitData = random(fruitTypes);
    let randomX = random(300, 500);
    let fruit = new Sprite(randomX, height+ 20, 40);
    fruit.image = fruitData.whole;
    fruit.type = fruitData;
    fruit.vel.y = random(-10, -14);
    fruit.vel.x = random(-2, 2);
    fruit.friction = 0;
    fruitGroup.add(fruit);
}