class Character {
    constructor(sprite) {
        this.sprite = sprite;
    }

    // Update the character's position, required method for game
    // Parameter: dt, a time delta between ticks
    update() {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
    }

    // Draw the character on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Enemies our player must avoid
class Enemy extends Character {
    constructor(sprite) {
        super(sprite);
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends Character {
    constructor(sprite) {
        super(sprite);
    }
}

const player = new Player('images/char-boy.png');
const enemy = new Enemy('images/enemy-bug.png');

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

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