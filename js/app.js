// Enemies our player must avoid
var Enemy = function(x, y) {
    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
    // Setting the Enemy initial location
    this.x = x;
    this.y = y;
    // Setting the Enemy speed 
    this.speed = (Math.floor(Math.random() * 3) + 2) * 100; // generates random number 200, 300 or 400
    // Used for collision detection. Values set by trial-and-error
    this.width = 60;
    this.height = 40;
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    // Updates the Enemy location
    // Since the width of the window is 505, when the enemy reaches
    // the x value of 505, it goes back to the far left which
    // is -101 because that is the width of the image
    if(this.x >= 505) {
      this.x = -101;
      this.speed = (Math.floor(Math.random() * 3) + 2) * 100; // generates random number 200, 300 or 400
    }
    // Checks collision with the Player
    this.checkCollisions();
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollisions = function() {
  // 2D Collison detection algorithm from Mozilla MDN
  // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
  if(this.x < player.x + player.width &&
    this.x + this.width > player.x &&
    this.y < player.y + player.height &&
    this.y + this.height > player.y) {
      player.resetPlayer(1);
  }
  // If the player reaches the water the game resets by moving the player back to the initial location
  if(player.y < 0) {
    player.resetPlayer(2);
  }
};

// Player class
var Player = function() {
  // The image/sprite for our player
  this.sprite = 'images/char-boy.png';
  // Setting the Player initial location
  this.x = 202; // Puts the player in the middle of the screen horizontally
  this.y = 300;
  // Used for collision detection. Values set by trial-and-error
  this.width = 80;
  this.height = 50;
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.resetPlayer = function(code) {
  if(code === 1) {
    alert('Ouch!');
  } else if (code === 2) {
    alert('You reached the water!');
  }
  this.x = 202;
  this.y = 300;
};

Player.prototype.handleInput = function(userInput) {
  let upDown = 85.5; // One-half the height of each image tile
  let leftRight = 50.5; // Half the width of each image tile
  switch(userInput){
    // moves the player to the left, but not off screen
    case 'left':
      this.x > 0 ? this.x -= leftRight : this.x -= 0;
      break;
    // moves the player up, but not past the water
    case 'up':
      this.y > 0 ? this.y -= upDown : this.y -= 0;
      break;
    // moves the player to the right, but not off screen
    case 'right':
      this.x < 505 - 101 ? this.x += leftRight : this.x += 0;
      break;
    // moves the player down, but not off screen
    case 'down':
      this.y < 606 - 171 * 1.5 ? this.y += upDown : this.y += 0;
      break;
  }
};

// Instantiates objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let player = new Player();
const allEnemies = [];
let enemy1 = new Enemy(-101, 43.5); // top row
let enemy2 = new Enemy(-101, 129); // middle row
let enemy3 = new Enemy(-101, 214.5); // bottom row
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);



// This listens for key presses and sends the keys to the Player.handleInput() method. 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
