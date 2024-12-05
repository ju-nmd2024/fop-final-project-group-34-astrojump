import Character from "./character.js";
import Platform from "./platform.js";
import Enemy from "./enemy.js";

//Game state
let gameState = "start";
let displayText = "";
let instruction = "";

//Checks if player presses ESCAPE key if so game is paused

//variables
let highestY = 600;

//Array for storing platforms
let player;
let astroid;
let alien;
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
  startingPlatform.breakable = false;
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
  startingPlatform.breakable = false;
  platforms.push(startingPlatform);

  //Stores 5 platforms in an array, each 100 pixels above the last
  astroid = new Platform();
  for (let i = 0; i < 5; i++) {
    platforms.push(new Platform(400 - i * 100));
  }

  alien = new Enemy();
  for (let i = 0; i < 1; i++) {
    enemies.push(new Enemy(0 - i * 650));
  }
}

//Code currently keeps player position after death which makes it so that
//when you restart the game instantly sees your position as dead setting
//the game to "lose" state

window.setup = setup;

function draw() {
  background(0, 0, 0);

  if (keyIsPressed && keyCode === ESCAPE && gameState === "running") {
    console.log("123");
    gameState = "paused";
  }
  if (keyIsPressed && keyCode === ENTER && gameState === "paused") {
    gameState = "running";
  }

  if (keyCode === ENTER) {
    if (gameState === "start") {
      gameState = "running";
    } else if (gameState === "lose") {
      resetGame();
      gameState = "start";
    }
  }

  let highScore = highestY - 300;
  let dispHigh = highScore.toString();

  if (gameState === "running") {
    fill(random(1, 255), random(1, 255), random(1, 255));
    textAlign(CENTER, CENTER);
    textSize(30);
    displayText = text((dispHigh *= -1), width / 2, height / 6);
    fill(255, 255, 255);
    textSize(10);
    instruction = text("ESC to pause", width / 2 - 160, height / 6 - 75);
  }

  //Start screen
  if (gameState === "start") {
    fill(random(1, 255), random(1, 255), random(1, 255));
    textAlign(CENTER, CENTER);
    textSize(30);
    displayText = text('PRESS "ENTER" TO START', width / 2, height / 2);
    textSize(50);
    instruction = text("ASTROJUMP", width / 2, height / 2 - 100);
    return;
  }

  //Shows pause message on screen and stops the other drawing logic
  if (gameState === "paused") {
    fill(random(1, 255), random(1, 255), random(1, 255));
    textAlign(CENTER, CENTER);
    textSize(32);
    displayText = text("PAUSED", width / 2, height / 2 - 100);
    instruction = text("Press ENTER to resume", width / 2, height / 2);
    return;
  }
  //lose screen
  if (gameState === "lose") {
    fill(random(1, 255), random(1, 255), random(1, 255));
    textAlign(CENTER, CENTER);
    textSize(30);
    displayText = text(
      "You died. Score:" + " " + dispHigh * -1,
      width / 2,
      height / 2
    );

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
  platforms = platforms.filter((platform) => platform.y < highestY + 250);

  //Logic for adding new platforms above current highest
  while (platforms.length < 6) {
    let highestPlatformY = Math.min(...platforms.map((platform) => platform.y));
    let newPlatformY = highestPlatformY - 100;
    platforms.push(new Platform(newPlatformY));
  }

  for (let enemy of enemies) {
    enemy.draw();
  }

  enemies = enemies.filter((enemy) => enemy.y < highestY + 250);

  while (enemies.length < 2) {
    let highestEnemyY = Math.min(...enemies.map((enemy) => enemy.y));
    let newEnemyY = highestEnemyY - 750;
    enemies.push(new Enemy(newEnemyY));
  }

  //Jump when landing on platform
  //asked chatgpt for how to properly remove platforms from the array
  //it gave us a for loop that uses backwards iteration

  for (let i = platforms.length - 1; i >= 0; i--) {
    //https://chatgpt.com/share/6750776f-89b0-8001-a075-8bcddf5e9adf
    let platform = platforms[i];

    if (player.velY > 0) {
      if (
        player.y + 25 > platform.y &&
        player.y < platform.y &&
        player.x + 10 > platform.x &&
        player.x < platform.x + platform.width
      ) {
        player.velY = -15;
        console.log("collision detected");
        if (platform.breakable === true) {
          platforms.splice(i, 1);
          console.log("breakable platform removed");
        }
      }
    }
  }

  for (let enemy of enemies) {
    if (
      player.y + 25 > enemy.y &&
      player.y < enemy.y &&
      player.x + 10 > enemy.x &&
      player.x < enemy.x + enemy.width
    ) {
      gameState = "lose";
    }
  }

  if (highestY + 300 < player.y) {
    gameState = "lose";
  }

  //highscore calculator

  highScore *= -1;
  highScore = highScore / 100;
  highScore = Math.floor(highScore);
}

window.draw = draw;

//Next step; put platforms in place, when u can move from platform to platform, make the screen move
//Everytime a platform goes out of the screen, remove them. Once a platform disappears, make a new one.
