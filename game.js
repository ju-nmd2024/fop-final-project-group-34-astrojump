//Import modules

import { Character } from "./character.js";
import { Platform } from "./platform.js";
let highestY = 600;
let platforms = [];

function setup() {
  createCanvas(400, 600);
  player = new Character();

  let startingPlatform = new Platform(500);
  startingPlatform.width = 400;
  startingPlatform.x = 0;
  platforms.push(startingPlatform);

  astroid = new Platform();
  for (let i = 0; i < 5; i++) {
    platforms.push(new Platform(100 * i));
  }
}
window.setup = setup;

function draw() {
  background(255, 255, 255);
  
  //Updates highest y to make camera follow character with translate
  if (player.y < highestY) {
    highestY = player.y;
  }

  translate(0, height / 2 - highestY);

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
}
window.draw = draw;

//Next step; put platforms in place, when u can move from platform to platform, make the screen move
//Everytime a platform goes out of the screen, remove them. Once a platform disappears, make a new one.
