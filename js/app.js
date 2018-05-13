// from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// The maximum is exclusive and the minimum is inclusive
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies,  uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// initialize enemy's location and speed
Enemy.prototype.initializeLocAndSpeed = function() {
    this.x = -101;
    this.y = getRandomInt(1, 4) * 83 - 20;
    this.speed = getRandomInt(10, 50) * 10;
}


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505) {
        this.x += this.speed * dt;
    }
    else {
        this.initializeLocAndSpeed();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
};

// initilize player's location.
Player.prototype.initializeLoc = function() {
    this.x = 2 * 101;
    this.y = 5 * 83 - 20;
}

// update player's location on the screen.
Player.prototype.update = function() {
    if (checkCollisions()) {
        this.initializeLoc();
    }
};

// draw player's image on the screen.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// check if player has reached left boundary of the canvas.
Player.prototype.reachLeftBoundary = function() {
    return this.x === 0;
}

// check if player has reached right boundary of the canvas.
Player.prototype.reachRightBoundary = function() {
    return this.x >= 101 * 4;
}

// check if player has reached top boundary of the canvas.
Player.prototype.reachTopBoundary = function() {
    return this.y === -20;
}

// check if player has reached bottom boundary of the canvas.
Player.prototype.reachBottomBoundary = function() {
    return this.y >= 83 * 5 - 20;
}

// handle user's input from keyboard.
// only four direction keys are responsed.
Player.prototype.handleInput = function(direction) {
    if (direction === 'left') {
        if (! this.reachLeftBoundary()) {
            this.x -= 101;
        }
    }
    else if (direction === 'right') {
        if (! this.reachRightBoundary()) {
            this.x += 101;
        }
    }
    else if (direction === 'up') {
        if (! this.reachTopBoundary()) {
            this.y -= 83;
            if (this.reachTopBoundary()) {
                this.initializeLoc();
            }
        }
    }
    else {
        if (! this.reachBottomBoundary()) {
            this.y += 83;
        }
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

/* Create n enemies
 * @param n: number of enemies
 */
function createEnemies(n) {
    var enemies = []
    for (var i = 0; i < n; i++) {
        var enemy = new Enemy();
        enemies.push(enemy);
    }
    return enemies;
}

var allEnemies = createEnemies(3);
var player = new Player();


// check if there is a collision between a player and an enemy.
function checkCollisions() {
    for (var enemy of allEnemies) {
        if (enemy.y === player.y && Math.abs(enemy.x - player.x) < 60) {
            return true;
        }
    }
    return false;
}


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
