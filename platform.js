export default class Platform {
  constructor() {
    this.x = random(1, 301);
    this.y = 400;
    this.width = 100;
    this.height = 15;
  }

  draw() {
    fill(255, 255, 0);
    rect(this.x, this.y, this.width, this.height);
  }
}