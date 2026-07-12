let ball;
let box;

function setup() {
  new Canvas(800, 400);
  background(250);

  ball = new Sprite();
  ball.x = 100;
  ball.y = 200;
  ball.diameter = 40;
  ball.color = "blue";
  
  box = new Sprite();
  box.x = 100;
  box.y = 100;
  box.width = 50;
  box.height = 50;
  box.color = "green";
}

function draw() {}