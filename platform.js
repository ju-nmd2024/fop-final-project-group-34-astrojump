export default class Platform {
  constructor(y) {
    this.x = random(1, 291);
    this.y = y;
    this.width = 110;
    this.height = 15;

    if (random() < 0.5) {
      this.speed = random([-2,2]);
    } else {
      (this.speed) = 0;
    }
    
    
    
  }

  


  draw() {
    this.x += this.speed;
    if (this.x > 400) {
      this.x = -this.width;
    } else if (this.x + this.width < 0) {
      this.x = 400;
    }

    fill(random(1, 255), random(1, 255), random(1, 255));
    rect(this.x, this.y, this.width, this.height);
  }
}
