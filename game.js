//character class

class Character {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.width = 30;
    this.height = 30;
    this.velX = 0;
    this.velY = 0;
    this.gravity = 0.5;
    this.jumpForce = -10;
    this.speed = 7;
  }

  move() {
    if (keyIsDown(LEFT_ARROW)) {
      this.velX = -this.speed;
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.velX = this.speed;
    } else {
      this.velX = 0;
    }

    this.x += this.velX;
  }

  draw() {
    fill(255, 0, 0);
    ellipse(this.x, this.y, this.width, this.height);
  }
}

function setup() {
  createCanvas(800, 600);
  player = new Character();
}

function draw() {
  background(255, 255, 255);
  player.draw();
  player.move();
}
