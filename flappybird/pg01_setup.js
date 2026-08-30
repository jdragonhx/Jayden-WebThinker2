let pipe;
let bottomPipe;
let topPipe;
let pipeGroup;
let bird, floor;
let flapMidImg, bg, base;
let gameoverImg;
let gameoverLabel;
let startScreenLabel;
let startScreenImg;
let startGame = false;
let score = 0;
let numberImages = [];
let scoreDigits;

function preload() {
    flapMidImg = loadImage('assets/yellowbird-midflap.png');
    flapUpImg = loadImage('assets/yellowbird-upflap.png');
    flapDownImg = loadImage('assets/yellowbird-downflap.png');
    bg = loadImage('assets/background-day.png');
    base = loadImage('assets/base.png');
    pipe = loadImage('assets/pipe-green.png');
    gameoverImg = loadImage('assets/gameover.png');
    startScreenImg = loadImage('assets/message.png');

    for(let i = 0; i < 10; i++){
        numberImages[i] = loadImage('assets/' + i + '.png')
    }
}

function setup() {
    new Canvas(400, 600);

    bird = new Sprite()
    bird.x = width / 2;
    bird.y = 200;
    bird.width = 30;
    bird.height = 30;
    bird.img = flapMidImg;

    bird.collider = "static";
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

    startScreenLabel = new Sprite(width/2, height/2, 50, 50, 'none');
    startScreenLabel.img = startScreenImg;

    scoreDigits = new Group();
    scoreDigits.collider = 'none';
    scoreDigits.layer = 1000;
}

function draw() {
    image(bg, 0, 0, width, height);

       if (kb.presses('space') || mouse.presses()){
        startGame = true;
        startScreenLabel.visible = false;
    }

    if (startGame){
        
        bird.collider = "dynamic"
        
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
            spawnPipePair();
        }

            bird.x += 3;
            camera.x = bird.x;
            floor.x = bird.x;

            if (frameCount % 90 === 0){
                spawnPipePair();
            }

            for (let pipe of pipeGroup){
                if (pipe.x < -50){
                    pipe.remove();
                }
            }

        if (bird.collides(pipeGroup) || bird.collides(floor)){
            gameoverLabel = new Sprite (width/2, height/2, 192, 42);
            gameoverLabel.img = gameoverImg;
            gameoverLabel.layer = 100;
            gameoverLabel.x = camera.x;

            noLoop();
        }
    }

}

function spawnPipePair(){
    let gap = 50;
    let midY = random(400, height - 400);

    bottomPipe = new Sprite(bird.x + 400, midY + gap / 2 + 200, 52, 320, 'static');
    bottomPipe.img = pipe;

    pipeGroup.add(bottomPipe);
    pipeGroup.layer = 0;

    topPipe = new Sprite(bird.x + 400, midY - gap / 2 - 200, 52, 320, 'static');
    topPipe.img = pipe;
    topPipe.rotation = 180;

    pipeGroup.add(topPipe);
    
}
