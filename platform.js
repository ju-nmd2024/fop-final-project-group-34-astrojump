export default class Platform {
  constructor(y) {
    this.x = random(1, 291);
    this.y = y;
    this.width = 110;
    this.height = 15;
    this.red = 0;
    this.blue = 0;
    this.green = 0;

    if (random() < 0.5) {
      this.speed = random([-2,2]);
    } else {
      (this.speed) = 0;
    }
  }
  

  


  draw() {
    this.x += this.speed;
    if (this.x > 400) {
      this.speed *= -1;
    } else if (this.x + this.width < 0) {
      this.speed *= -1;
    }

    //color
    if (this.red < 255) {
      this.red += 5;
    }



    fill(this.red, this.green, this.blue);
    rect(this.x, this.y, this.width, this.height);
  }
}
