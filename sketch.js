let bird;
let obstacles = [];
let score = 0;
let gameOver = false;
let birdImg;
let obstacleTopImg;
let obstacleBottomImg;
let baseImg;  // Image for the base
let buttonX, buttonY, buttonWidth, buttonHeight;

function preload() {
  birdImg = tryLoadImage('sprites/bluebird-downflap.png');
  obstacleTopImg = tryLoadImage('sprites/pipe-green.png');
  obstacleBottomImg = tryLoadImage('sprites/pipe-red.png');
  baseImg = tryLoadImage('sprites/base.png');  // Load the base image
}

function tryLoadImage(path) {
  let img;
  try {
    img = loadImage(path);
  } catch (e) {
    console.error(`Failed to load image at ${path}`);
    img = null;
  }
  return img;
}

// ...

function Bird() {
  // ...

  this.show = function() {
    if (birdImg) {
      image(birdImg, this.x, this.y, 32, 32);
    } else {
      fill(255);
      ellipse(this.x, this.y, 32, 32);
    }
  }

  // ...
}

function Obstacle() {
  // ...

  this.show = function() {
    if (obstacleTopImg && obstacleBottomImg) {
      image(obstacleTopImg, this.x, 0, this.w, this.top);
      image(obstacleBottomImg, this.x, height - this.bottom, this.w, this.bottom);
    } else {
      fill(255);
      rect(this.x, 0, this.w, this.top);
      rect(this.x, height - this.bottom, this.w, this.bottom);
    }
  }

  // ...
}

function draw() {
  // ...

  if (baseImg) {
    image(baseImg, 0, height - baseImg.height);  // Draw the base image at the bottom of the screen
  } else {
    fill(255);
    rect(0, height - 20, width, 20);
  }

  // ...
}
