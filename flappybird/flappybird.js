// Flappy Bird

function setup() {
    createCanvas(400, 600);
    bird = new Bird();
    pipes = [];
    pipeInterval = 100;
    frameCount = 0;
}