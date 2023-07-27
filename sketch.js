let bird;
let obstacles = [];
let score = 0;

function setup() {
  createCanvas(400, 600);
  bird = new Bird();
  obstacles.push(new Obstacle());
}

function draw() {
  background(0);
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
    fill(255);
    ellipse(this.x, this.y, 32, 32);
  }

  this.up = function() {
    this.velocity += this.lift;
  }

  this.update = function() {
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.y > height) {
      this.y = height;
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
  this.bottom = random(height / 2);
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
    fill(255);
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
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
