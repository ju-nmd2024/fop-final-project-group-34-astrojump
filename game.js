//Import modules

import { Character } from "./character.js";
import { Platform } from "./platform.js";

//put the platforms into an array



let highestY = 600;
let platforms = [];

function setup() {
  createCanvas(400, 600);
  player = new Character();

  let startingPlatform = new Platform(500);
  startingPlatform.width = 800;
  startingPlatform.x = 0;
  platforms.push(startingPlatform);

//initilize new platoforms with for loop

  astroid = new Platform();
  for (let i = 0; i < 5; i++) {
    platforms.push(new Platform(100 * i));
  }
}
window.setup = setup;

function draw() {
  background(255, 255, 255);

  //checks the lowest y for player and moves the camera
  if (player.y < highestY) {
    highestY = player.y;
  }
  translate(0,height/2 - highestY);

  player.draw();
  player.move();
  player.update();
  astroid.draw();
  for (let platform of platforms) {
    platform.draw();
  }

  //jump when landing on platform

  

  for (let platform of platforms) {
    if (player.velY > 0) {
      if (
        player.y + 25 > platform.y &&
        player.y < platform.y &&
        player.x + 10 > platform.x &&
        player.x < platform.x + platform.width
      ) {
        player.velY = -15;
        console.log("collision detected");
        
      }
    }

    
    
  }

  



  //camera
  

  

  

console.log(highestY);
}
window.draw = draw;

//Next step; put platforms in place, when u can move from platform to platform, make the screen move
//Everytime a platform goes out of the screen, remove them. Once a platform disappears, make a new one.
