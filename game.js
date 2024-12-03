//Import modules
import { Character } from "./character.js";
import { Platform } from "./platform.js";

//Game state
let gameState = "start";
let displayText = "";


//Checks if player presses ESCAPE key if so game is paused
function keyPressed() {
  if (keyCode === ESCAPE) {
    if (gameState === "running") {
      gameState = "paused";
    } else if (gameState === "paused") {
      gameState = "running";
    }
  }
  if (keyCode === ENTER) {
    if (gameState === "start") {
      gameState = "running";
    }
  }
  if (keyCode === ENTER) {
    if (gameState === "lose") {
      gameState = "start";
    }
  }
}




let highestY = 600;


//Array for storing platforms
let platforms = [];

function setup() {
  createCanvas(400, 500);
  player = new Character();

  //Dimensions for the starting platform and puts it first in the platforms array
  let startingPlatform = new Platform(500);
  startingPlatform.width = 400;
  startingPlatform.x = 0;
  startingPlatform.speed = 0;
  platforms.push(startingPlatform);

  //Stores 5 platforms in an array, each 100 pixels above the last
  astroid = new Platform();
  for (let i = 0; i < 5; i++) {
    platforms.push(new Platform(400 - i * 100)); 
  }
}




window.setup = setup;

function draw() {
  background(255, 255, 255); 
  

  //Start screen
  if (gameState === "start") {
    fill(random(1, 255), random(1, 255), random(1, 255));
    textAlign(CENTER, CENTER);
    textSize(30);
    displayText = text('PRESS "ENTER" TO START', width / 2, height / 2);
    return;
  }

  //Shows pause message on screen and stops the other drawing logic
  if (gameState === "paused") {
    fill(random(1, 255), random(1, 255), random(1, 255));
    textAlign(CENTER, CENTER);
    textSize(32);
    displayText = text("PAUSED", width / 2, height / 2);
    return;
  }
//lose scréen
  if (gameState === "lose") {
    fill(random(1, 255), random(1, 255), random(1, 255));
    textAlign(CENTER, CENTER);
    textSize(30);
    displayText = text("You died", width / 2, height / 2);
    return;
  }
  
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

  //Removes platforms outside the visible canvas
  platforms = platforms.filter(platform => platform.y < highestY + 250);

  //Logic for adding new platforms above current highest
  while (platforms.length < 6) {
    let highestPlatformY = Math.min(...platforms.map(platform => platform.y));
    let newPlatformY = highestPlatformY - 100;
    platforms.push(new Platform(newPlatformY));
  }


  //Jump when landing on platform

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

  if (highestY + 400 < player.y) {
    gameState = "lose";
    
  }
  console.log("player.y");
  console.log(player.y);

  console.log("highestY + 400");
  console.log(highestY + 400);
}


window.draw = draw; 

//Next step; put platforms in place, when u can move from platform to platform, make the screen move
//Everytime a platform goes out of the screen, remove them. Once a platform disappears, make a new one.
