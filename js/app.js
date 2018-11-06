// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // Setting the Enemy initial location (you need to implement)
    this.x = x;
    this.y = y;
    // Setting the Enemy speed (you need to implement)
    // this.speed = (Math.floor(Math.random() * 3) + 2) * 100; // generates random number 200, 300 or 400
    this.speed = 50;
    this.width = 101;
    this.height = 171;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    // Updates the Enemy location (you need to implement)
    // The width of the window is 505. When the enemy reaches
    // the x value of 505, it goes back to the far left which
    // is -101 because that is the width of the image
    if(this.x >= 505) {
      this.x = -101;
      this.speed = (Math.floor(Math.random() * 3) + 2) * 100;
    }
    // Handles collision with the Player (you need to implement)
    // 2D Collison detection algorithm from Mozilla MDN
    // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    if(this.x < player.x + player.width &&
      this.x + this.width > player.x &&
      this.y < player.y + player.height &&
      this.y + this.height > player.y) {
        alert('ouch');
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollisions = function() {
  
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = 'images/char-boy.png';
  // Setting the Player initial location (you need to implement)
  this.x = 202; // Image width is 101, doubling it puts the player in the middle of the screen
  this.y = 300;
  this.width = 101;
  this.height = 171;
};

// Update the players's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
  // Updates the Player location (you need to implement)
  // Handles collision with the Enemy (you need to implement)
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.resetPlayer = function() {
  
};

Player.prototype.handleInput = function(userInput) {
  // Left key should move the player to the left, right key to the right, up should move the player up and down should move the player down
  let upDown = 42.75; // One-Fourth the height of each image tile
  let leftRight = 50.5; // Half the width of each image tile
  switch(userInput){
    case 'left':
      this.x > 0 ? this.x -= leftRight : this.x -=0;
      break;    
    case 'up':
      this.y > 0 ? this.y -= upDown : this.y -= 0;
      break;
    case 'right':
      this.x < 505 - 101 ? this.x += leftRight : this.x +=0;
      break;
    case 'down':
      this.y < 606 - 171 * 1.5 ? this.y += upDown : this.y += 0;
      break;
    default: 

  }
  // Recall that the player cannot move off screen (so you will need to check for that and handle appropriately)
  // If the player reaches the water the game should be reset by moving the player back to the initial location (you can write a separate reset Player method to handle that)
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];
let enemy1 = new Enemy(-101, 43.5); // top row
let enemy2 = new Enemy(-101, 129); // middle row
let enemy3 = new Enemy(-101, 214.5); // bottom row
// allEnemies.push(enemy1);
// allEnemies.push(enemy2);
allEnemies.push(enemy3);
let player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
