// Flappy Bird

function setup() {
    createCanvas(400, 600);
    bird = new Bird();
    pipes = [];
    pipeInterval = 100;
    frameCount = 0;
}

function draw() {
    background(0, 191, 255);
    bird.update();
    bird.show();
    
    if (frameCount % pipeInterval === 0) {
        pipes.push(new Pipe());
    }

    for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].update();
        pipes[i].show();
        
        if (pipes[i].hits(bird)) {
            console.log("Game Over");
            noLoop();
        }

        if (pipes[i].offscreen()) {
            pipes.splice(i, 1);
        }
    }
    
    frameCount++;
}
