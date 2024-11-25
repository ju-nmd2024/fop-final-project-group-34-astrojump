//character class

class Character {
  constructor() {
    this.x = width / 2;
    this.y = height / 2; 
    this.width = 30;
    this.height = 30;
    this.vertX = 0;
    this.vertY = 0;
    this.gravity = 0.5;
    this.jumpForce = -10;
    this.speed = 5;
  }
 



function setup() {
  createCanvas(800, 600);
  myCharacter = new Character();
}

function draw() {
  background(255, 255, 255);
  myCharacter.draw();
  
}




