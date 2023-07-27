let bird;
let obstacles = [];
let score = 0;
let gameOver = false;
let birdImg;
let obstacleTopImg;
let obstacleBottomImg;
let floorHeight = 50;  // Height of the floor
let buttonX, buttonY, buttonWidth, buttonHeight;

function preload() {
  birdImg = loadImage('sprites/bluebird-downflap.png');
  obstacleTopImg = loadImage('sprites/pipe-green.png');
  obstacleBottomImg = loadImage('sprites/pipe-red.png');
}

function setup() {
  createCanvas(400, 600);
  bird = new Bird();
  obstacles.push(new Obstacle());
  buttonWidth = 200;
  buttonHeight = 50;
  buttonX = width / 2 - buttonWidth / 2;
  buttonY = height / 2 - buttonHeight / 2;
}

function draw() {
  background(0);

  // Draw the floor
  fill(255);
  rect(0, height - floorHeight, width, floorHeight);
  
  bird.update();
  bird.show();

  if (!gameOver) {
    if (frameCount % 100 == 0) {
      obstacles.push(new Obstacle());
    }

    for (let i = obstacles.length - 1; i >= 0; i--) {
      obstacles[i].show();
      obstacles[i].update();

      if (obstacles[i].hits(bird)) {
        console.log("HIT");
        gameOver = true;
      }

      if (obstacles[i].offscreen()) {
        obstacles.splice(i, 1);
      }
    }
  } else {
    fill(255);
    textSize(50);
    textAlign(CENTER, CENTER);
    text("Game Over", width / 2, height / 4);

    // Draw the restart button
    fill(200);
    rect(buttonX, buttonY, buttonWidth, buttonHeight);
    fill(0);
    textSize(20);
    text("Restart Game", width / 2, height / 2);
  }

  fill(255);
  textSize(32);
  text("Score: " + score, 10, 50);
}

function keyPressed() {
  if (key == ' ') {
    bird.up();
  }
}

function mousePressed() {
  // Check if the mouse click is within the bounds of the button
  if (gameOver && mouseX > buttonX && mouseX < buttonX + buttonWidth && mouseY > buttonY && mouseY < buttonY + buttonHeight) {
    // Restart the game
    bird = new Bird();
    obstacles = [];
    score = 0;
    gameOver = false;
  }
}

function Bird() {
  this.y = height / 2;
  this.x = 64;
  this.gravity = 0.6;
  this.lift = -15;
  this.velocity = 0;

  this.show = function() {
    image(birdImg, this.x, this.y, 32, 32);
  }

  this.up = function() {
    this.velocity += this.lift;
  }

  this.update = function() {
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.y > height - floorHeight) {
      this.y = height - floorHeight;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }
}

function Obstacle() {
  this.top = random(height / 2);
  this.bottom = random(height / 2 - floorHeight);
  this.x = width;
  this.w = 20;
  this.speed = 2;

  this.hits = function(bird) {
    if (bird.y < this.top || bird.y > height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        return true;
      }
    }
    return false;
  }

  this.show = function() {
    image(obstacleTopImg, this.x, 0, this.w, this.top);
    image(obstacleBottomImg, this.x, height - this.bottom, this.w, this.bottom);
  }

  this.update = function() {
    this.x -= this.speed;
  }

  this.offscreen = function() {
    if (this.x < -this.w) {
      score++;
      return true;
    } else {
      return false;
    }
  }
}
