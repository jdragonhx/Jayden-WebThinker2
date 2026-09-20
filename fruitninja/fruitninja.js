let fruits;
let trail = [];
let score = 0;
let lives = 3;
let gameOver = false;

function setup() {
  new Canvas(800, 600);
  world.gravity.y = 900;

  fruits = new Group();
  fruits.collider = 'circle';

  textAlign(CENTER, CENTER);
  noStroke();

  for (let i = 0; i < 4; i++) {
    spawnFruit();
  }
}

function draw() {
  background(245, 248, 255);

  drawHud();

  if (!gameOver) {
    if (frameCount % 55 === 0) {
      spawnFruit();
    }

    updateTrail();
    checkMissedFruit();
    updateFruitMotion();
  } else {
    drawGameOver();

    if (mouse.presses()) {
      resetGame();
    }
  }
}

function spawnFruit() {
  const isBomb = random() < 0.16;
  const size = random(32, 54);
  const x = random(60, width - 60);
  const y = height + size;

  let fruit = new Sprite(x, y, size, size);
  fruit.collider = 'circle';
  fruit.mass = 1;
  fruit.vel.x = random(-4, 4);
  fruit.vel.y = random(-15, -10);
  fruit.rotationSpeed = random(-2, 2);
  fruit.bounciness = 0.2;

  if (isBomb) {
    fruit.color = '#1a1a1a';
    fruit.bomb = true;
    fruit.img = null;
    fruit.diameter = size;
    fruit.shape = 'circle';
    fruit.label = 'bomb';
    fruit.text = '💣';
  } else {
    const fruitColors = ['#ff4d4d', '#ff9f1c', '#ffd166', '#06d6a0', '#4cc9f0', '#9b5de5'];
    fruit.color = random(fruitColors);
    fruit.bomb = false;
    fruit.label = 'fruit';
  }

  fruits.add(fruit);
}

function updateTrail() {
  if (mouseIsPressed) {
    trail.push({ x: mouse.x, y: mouse.y });

    if (trail.length > 16) {
      trail.shift();
    }

    for (let fruit of fruits) {
      if (fruit.bomb || fruit.isRemoved) {
        continue;
      }

      for (let point of trail) {
        if (dist(fruit.x, fruit.y, point.x, point.y) < fruit.width * 0.7) {
          sliceFruit(fruit);
          break;
        }
      }
    }
  }

  drawTrail();
}

function drawTrail() {
  if (trail.length < 2) {
    return;
  }

  noFill();
  stroke(255, 100, 100);
  strokeWeight(4);
  beginShape();
  for (let point of trail) {
    vertex(point.x, point.y);
  }
  endShape();
  noStroke();
}

function sliceFruit(fruit) {
  if (fruit.isRemoved) {
    return;
  }

  if (fruit.bomb) {
    score = max(0, score - 15);
    lives -= 1;
    fruit.remove();
    shakeScreen();
  } else {
    score += 10;
    fruit.remove();
    createBurst(fruit.x, fruit.y, fruit.color);
  }

  if (lives <= 0) {
    gameOver = true;
  }
}

function createBurst(x, y, colorValue) {
  for (let i = 0; i < 12; i++) {
    let p = new Sprite(x, y, 5, 5);
    p.color = colorValue;
    p.vel.x = random(-6, 6);
    p.vel.y = random(-6, 6);
    p.life = 18;
    p.collider = 'none';
  }
}

function checkMissedFruit() {
  for (let fruit of fruits) {
    if (fruit.y > height + fruit.height) {
      if (!fruit.bomb) {
        lives -= 1;
      }
      fruit.remove();
    }
  }

  if (lives <= 0) {
    gameOver = true;
  }
}

function updateFruitMotion() {
  for (let fruit of fruits) {
    fruit.rotation += fruit.rotationSpeed;
    fruit.vel.y += 0.5;
  }
}

function drawHud() {
  fill('#1f2937');
  textSize(24);
  text('Score: ' + score, 100, 35);
  text('Lives: ' + lives, width - 120, 35);
}

function drawGameOver() {
  fill('#111827');
  rect(0, 0, width, height);

  fill('#f8fafc');
  textSize(52);
  text('Game Over', width / 2, height / 2 - 20);

  textSize(28);
  text('Final Score: ' + score, width / 2, height / 2 + 35);
  text('Click to play again', width / 2, height / 2 + 80);
}

function resetGame() {
  fruits.removeAll();
  trail = [];
  score = 0;
  lives = 3;
  gameOver = false;

  for (let i = 0; i < 4; i++) {
    spawnFruit();
  }
}

function shakeScreen() {
  const offset = random(-3, 3);
  camera.x += offset;
  camera.y += offset;
}


let playerScore = 0;
let computerScore = 0;

function setup() {
  createCanvas(400, 400);
  textSize(32);
}

function draw() {
  background(220);
    
    text("Player: " + playerScore, 10, 30);
    text("Computer: " + computerScore, 10, 70);
    }
    
