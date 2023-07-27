let bird;
let obstacles = [];
let score = 0;
let birdImg;
let obstacleTopImg;
let obstacleBottomImg;
let floorHeight = 50;  // Height of the floor

function preload() {
  birdImg = loadImage('path_to_your_bird_image.png');
  obstacleTopImg = loadImage('path_to_your_obstacle_top_image.png');
  obstacleBottomImg = loadImage('path_to_your_obstacle_bottom_image.png');
}

function setup() {
  createCanvas(400, 600);
  bird = new Bird();
  obstacles.push(new Obstacle());
}

function draw() {
  background(0);
  
  // Draw the floor
  fill(255);
  rect(0, height - floorHeight, width, floorHeight);
  
  bird.update();
  bird.show();

  if (frameCount % 100 == 0) {
    obstacles.push(new Obstacle());
  }

  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].show();
    obstacles[i].update();

    if (obstacles[i].hits(bird)) {
      console.log("HIT");
      noLoop();
    }

    if (obstacles[i].offscreen()) {
      obstacles.splice(i, 1);
    }
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

    if (this.y > height - floorHeight) {  // Adjusted for the floor
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
  this.bottom = random(height / 2 - floorHeight);  // Adjusted for the floor
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
