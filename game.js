//Import modules

import { Character } from "./character";
import { Platform } from "./platform";

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

  if (
    player.y + 25 > astroid.y &&
    player.y < astroid.y + astroid.height &&
    player.x > astroid.x &&
    player.x < astroid.x + astroid.width
  ) {
    player.velY -= 15;
  }
}
