export default class Character {
  constructor() {
    this.x = 400 / 2;
    this.y = 600 / 2;
    this.width = 30;
    this.height = 30;

    this.velX = 0;
    this.velY = 0;
    this.gravity = 0.5;
    this.jumpForce = -5;
    this.speed = 3;
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
    fill(255, 255, 255);
    ellipse(this.x, this.y, this.width, this.height);
  }
}
