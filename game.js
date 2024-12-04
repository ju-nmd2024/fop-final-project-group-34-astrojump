//Import modules
import { Character } from "./character.js";
import { Platform } from "./platform.js";
import { Enemy } from "./enemy.js";

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
    } else if (gameState === "lose") {
      resetGame();
      gameState = "start";
    }
  }
} 



//variables
let highestY = 600;



//Array for storing platforms
let platforms = [];
let enemies = [];

function resetGame() {  
  player.y = 300;
  player.velY = 0;

  highestY = 600;

  platforms = [];
  let startingPlatform = new Platform(500);
  startingPlatform.width = 400;
  startingPlatform.x = 0;
  startingPlatform.speed = 0;
  platforms.push(startingPlatform);

  for (let i = 0; i < 5; i++) {
    platforms.push(new Platform(400 - i * 100));
  }

  enemies = [];
  
  for (let i = 0; i < 2; i++) {
    enemies.push(new Enemy(0 - i * 600));
  }
}

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
  
  alien = new Enemy();
  for (let i = 0; i < 2; i++) {
    enemies.push(new Enemy(0 - i * 600));
  }
}


//Code currently keeps player position after death which makes it so that
//when you restart the game instantly sees your position as dead setting
//the game to "lose" state

window.setup = setup;

function draw() {
  background(255, 255, 255); 

  let highScore = highestY -300;
  let dispHigh = highScore.toString();


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
//lose screen
  if (gameState === "lose") {
    fill(random(1, 255), random(1, 255), random(1, 255));
    textAlign(CENTER, CENTER);
    textSize(30);
    displayText = text("You died. Score:" + " " + dispHigh*-1, width / 2, height / 2);
    
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
  alien.draw();
  
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

  for (let enemy of enemies ) {
    enemy.draw();
  }

  enemies = enemies.filter(enemy => enemy.y < highestY + 250);

  while (enemies.length < 3) {
    let highestEnemyY = Math.min(...enemies.map(enemy => enemy.y));
    let newEnemyY = highestEnemyY - 800;
    enemies.push(new Enemy(newEnemyY));
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

  //highscore calculator
  
  highScore *= -1;
  highScore = highScore/100;
  highScore = Math.floor(highScore);
  highScore = 
  console.log(highScore);  

}


window.draw = draw;  

//Next step; put platforms in place, when u can move from platform to platform, make the screen move
//Everytime a platform goes out of the screen, remove them. Once a platform disappears, make a new one.
