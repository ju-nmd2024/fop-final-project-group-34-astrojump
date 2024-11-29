//Import modules

import { Character } from "./character.js";
import { Platform } from "./platform.js";

let platforms = [];

function setup() {
  createCanvas(400, 600);
  player = new Character();
  astroid = new Platform();
  for (let i; i < 5; i++) {
    platforms.push(new Platform(100 * i));
  }
}
window.setup = setup;

function draw() {
  background(255, 255, 255);
  player.draw();
  player.move();
  player.update();
  astroid.draw();
  for (let platform of platforms) {
    platform.draw();
  }

  //jump when landing on platform

  if (
    player.y + 25 > astroid.y &&
    player.y < astroid.y + astroid.height &&
    player.x > astroid.x &&
    player.x < astroid.x + astroid.width
  ) {
    player.velY -= 15;
  }
}
window.draw = draw;

//Next step; put platforms in place, when u can move from platform to platform, make the screen move
//Everytime a platform goes out of the screen, remove them. Once a platform disappears, make a new one.
