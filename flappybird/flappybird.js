// Flappy Bird

function Setup() {
    createCanvas(400, 600);
    bird = new Bird();
    pipes = [];
    pipes.push(new Pipe());
    }

function draw() {
    background(0);
    bird.update();
    bird.show();
    
    if (frameCount % 75 == 0) {
        pipes.push(new Pipe());
    }
}