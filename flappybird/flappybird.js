// Flappy Bird

function setup() {
    createCanvas(600, 600);
    background("white");
    bird = new Bird();
    pipes = [];
    pipes.push(new Pipe());
    }

function draw() {
    background(100);
    bird.update();
    bird.show();
    
    if (frameCount % 75 == 0) {
        pipes.push(new Pipe());
    }
}