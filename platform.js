export default class Platform {
  constructor(y) {
    this.x = random(1, 301);
    this.y = y;
    this.width = 110;
    this.height = 15;
  }

  draw() {
    fill(random(1, 255), random(1, 255), random(1, 255));
    rect(this.x, this.y, this.width, this.height);
  }
}
