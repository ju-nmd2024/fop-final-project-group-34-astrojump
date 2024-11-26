//character class

class Character {
  constructor() {
    this.x = 400 / 2;
    this.y = 600 / 2;
    this.width = 30;
    this.height = 30;

    this.velX = 0;
    this.velY = 0;
    this.gravity = 1.0;
    this.jumpForce = -10;
    this.speed = 7;
  }

  // Character moves if player presses left or right arrows
  move() {
    if (keyIsDown(LEFT_ARROW)) {
      this.velX = -this.speed;
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.velX = this.speed;
    } else {
      this.velX = 0;
    }

    this.x += this.velX;

    // Asked chatgpt for horizontal character screen wrapping
    // https://chatgpt.com/share/67449514-b470-8001-b741-23c701b91a3b

    if (this.x > 400) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = 400;
    }
  }

  // Apply gravity & stop if character moves too far
  update() {
    this.velY += this.gravity;

    this.y += this.velY;

    if (this.y > 570) {
      this.gravity = 0;
      this.velY = 0;
    }
  }

  draw() {
    fill(255, 0, 0);
    ellipse(this.x, this.y, this.width, this.height);
  }
}

class Platform {
  constructor() {
    this.x = random(1, 301);
    this.y = 320;
    this.width = 100;
    this.height = 15;
  }

  draw() {
    fill(255, 255, 0);
    rect(this.x, this.y, this.width, this.height);
  }
}

function setup() {
  createCanvas(400, 600);
  player = new Character();
  astroid = new Platform();
}

function draw() {
  background(255, 255, 255);
  player.draw();
  player.move();
  player.update();
  astroid.draw();

  //jump when landing on platform

  if (player.y + 25 > astroid.y) {
    player.velY -= 15;
  }
}
