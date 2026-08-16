let pipeGroup;
let bird, floor;
let flapMidImg, bg, base;

function preload() {
    flapMidImg = loadImage('assets/yellowbird-midflap.png');
    flapUpImg = loadImage('assets/yellowbird-upflap.png');
    flapDownImg = loadImage('assets/yellowbird-downflap.png');
    bg = loadImage('assets/background-day.png');
    base = loadImage('assets/base.png');
}

function setup() {
    new Canvas(400, 600);

    bird = new Sprite()
    bird.x = width / 2;
    bird.y = 200;
    bird.width = 30;
    bird.height = 30;
    bird.img = flapMidImg;

    bird.collider = "dynamic";
    bird.mass = 2;
    bird.drag = 0.02;
    bird.bounciness = 0.5;
    world.gravity.y = 10;


    floor = new Sprite()
    floor.x = 200;
    floor.y = height - 20;
    floor.width = 400;
    floor.height = 125;
    floor.collider = "static"
    floor.img = base;

    pipeGroup = new Group();
}

function draw() {
    image(bg, 0, 0, width, height);

    if (kb.presses('space')) {
        bird.vel.y = -5;
        bird.sleeping = false;
    }

    fill("blue");
    textSize(14)
    text('vel.y:' + bird.vel.y.toFixed(2), 10, 20)
    text('isMoving: ' + bird.isMoving, 10, 40);
    text('sleeping:' + bird.sleeping , 10, 60);

    if (bird.vel.y < -1) {
        bird.img = flapUpImg;
        bird.rotation = -30;
    }
    
    else if (bird.vel.y > 1) {
        bird.img = flapDownImg;
        bird.rotation = 30;
    }
    
    else {
        bird.img = flapMidImg;
        bird.rotation = 0;
    }

    if (frameCount === 1) {
        for (let i = 0; i < 3; i++) {
            let pipeTop = new Sprite();
            pipeTop.width = 50;
            pipeTop.height = random(100, 300);
            pipeTop.x = width + i * 200;
            pipeTop.y = 0;
            pipeTop.collider = "static";
            pipeTop.img = loadImage('assets/pipe-green.png');
            pipeGroup.add(pipeTop);

            let pipeBottom = new Sprite();
            pipeBottom.width = 50;
            pipeBottom.height = height - (pipeTop.height + 150);
            pipeBottom.x = width + i * 200;
            pipeBottom.y = height - pipeBottom.height;
            pipeBottom.collider = "static";
            pipeBottom.img = loadImage('assets/pipe-green.png');
            pipeGroup.add(pipeBottom);
        }
    }

    for (let i = 0; i < pipeGroup.length; i++) {
        let pipe = pipeGroup[i];
        pipe.vel.x = -2;

        if (pipe.x < -50) {
            pipe.x = width + 200;
            if (pipe.y === 0) {
                pipe.height = random(100, 300);
            } else {
                let topPipe = pipeGroup[i - 1];
                pipe.height = height - (topPipe.height + 150);
                pipe.y = height - pipe.height;
            }
        }
    }

}
