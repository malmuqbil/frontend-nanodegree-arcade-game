// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png'; 
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt){
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    // the enemies  will come from left side 
    if (this.x >= 505) {
        this.x = 0;
}
    // Check for collision with enemies or barrier-walls
   this.checkCollision();
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};
Player.prototype.update = function() {
    // used for update
}
// Draw the player on the screen, required method for game
// Display score
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    displayScoreLevel(score, gameLevel);
};
Player.prototype.handleInput = function(keys) {
    if (keys == 'left') {
        player.x -= player.speed;
    }
    if (keys == 'up') {
        player.y -= player.speed - 20;
    }
    if (keys == 'right') {
        player.x += player.speed;
    }
    if (keys == 'down') {
        player.y += player.speed - 20;
    }
    console.log('keys is: ' + keys);
    };
    // score
var displayScoreLevel = function(Score, Level) {
    var canvas = document.getElementsByTagName('canvas');
    var firstCanvasTag = canvas[0];
    // add player score and level to div element created
    scoreLevelDiv.innerHTML = 'Score: ' + Score
        + ' / ' + 'Level: ' + Level;
    document.body.insertBefore(scoreLevelDiv, firstCanvasTag[0]);
};
Enemy.prototype.checkCollision = function(Enemy) {
// check for collision between player and enemy
    if (
        player.y + 131 >= this.y + 90
        && player.x + 25 <= this.x + 88
        && player.y + 73 <= this.y + 135
        && player.x + 76 >= this.x + 11) {
        player.x = 202.5;
        player.y = 383;
    }
    // when player wins, add 1 to the score and level
    // Difficulty increase with the level 
    if (player.y + 5 <= 0) {        
        player.x = 202.5;
        player.y = 383;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 505, 171);
        score += 1;
        gameLevel += 1;
        console.log('current score: ' + score + ', current level: ' + gameLevel);
        increaseDifficulty(score);
    }
    // Can't go out side boundaries
    if (player.y > 383 ) {
        player.y = 383;
    }
    if (player.x > 402.5) {
        player.x = 402.5;
    }
    if (player.x < 2.5) {
        player.x = 2.5;
    }
};
    // Increase number of enemies on screen based on player's score
var increaseDifficulty = function(numEnemies) {
    // remove all previous enemies on canvas
    allEnemies.length = 0;
    // load new set of enemies
    for (var i = 0; i <= numEnemies; i++) {
var enemy = new Enemy(0, Math.random() * 150 + 20, Math.random() * 256);
        allEnemies.push(enemy);
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Enemy randomly placed vertically within section of canvas
// Declare new score and gameLevel variables to store score and level
var allEnemies = [];
var player = new Player(202.5, 383, 100);
var score = 0;
var gameLevel = 1;
var scoreLevelDiv = document.createElement('div');
var enemy = new Enemy(0, Math.random() * 150 + 20, Math.random() * 256);
    allEnemies.push(enemy);
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
