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

function keyPressed() {
    if (key === ' ') {
        bird.up();
    }
}   

function Bird() {
    this.y = height / 2;
    this.x = 64;
    this.gravity = 0.6;
    this.lift = -15;
    this.velocity = 0;
    
    this.show = function() {
        fill(255);
        ellipse(this.x, this.y, 32, 32);
    }

    this.up = function() {
        this.velocity += this.lift;
    }
    
    this.update = function() {
        this.velocity += this.gravity;
        this.y += this.velocity;
    }

    this.hits = function(pipe) {
        if (this.y < pipe.top || this.y > height - pipe.bottom) {
            if (this.x > pipe.x && this.x < pipe.x + pipe.w) {
                return true;
            }
        }
        return false;
    }
}

function Pipe() {
    this.top = random(height / 2);
    this.bottom = random(height / 2);
    this.x = width;
    this.w = 20;
    this.speed = 2;
    
    this.show = function() {
        fill(34, 139, 34);
        rect(this.x, 0, this.w, this.top);
        rect(this.x, height - this.bottom, this.w, this.bottom);
    }
    
    this.update = function() {
        this.x -= this.speed;
    }
    
    this.offscreen = function() {
        return (this.x < -this.w);
    }
}

function hits(bird) {
    for (let i = 0; i < pipes.length; i++) {
        if (pipes[i].hits(bird)) {
            return true;
        }
    }
    return false;
}

function resetGame() {
    bird = new Bird();
    pipes = [];
    frameCount = 0;
    loop();
}

