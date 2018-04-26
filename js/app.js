class Character {
    constructor(img) {
        this.sprite = { img, w:101, h:83 };
    }

    // Update the character's position, required method for game
    // Parameter: dt, a time delta between ticks
    update() {
        // this.x = this.sprite.w * (this.position.col);
        // this.y = this.sprite.h * (this.position.row - 0.5); // 0.5 for depth perception
    }

    // Draw the character on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite.img), this.x, this.y);
    }
}

// Enemies our player must avoid
class Enemy extends Character {
    constructor(img) {
        super(img);

        this.x = 0 - this.sprite.w;
        this.y = (Math.floor(Math.random() * (3 - 1 + 1)) + 1 ) * this.sprite.h - (this.sprite.h / 2);
        this.speed = Math.random() * (5 - 1) + 1;
    }

    update() {
        super.update();
        this.x += this.speed;

        if (this.x > 5 * this.sprite.w) {
            console.log('removing enemy');

            // remove the object from the array, allows for garbage collection of object
            return allEnemies.splice(allEnemies.indexOf(this), 1);
        }
    }
}

class Player extends Character {
    constructor(img) {
        super(img);

        // give character starting position, width depth
        this.x = this.sprite.w * 2;
        this.y = this.sprite.h * 4.5;
    }

    update() {
        super.update();

        this.checkCurrentPosition();
    }

    render() {
        super.render();
    }

    checkCurrentPosition() {
        // check to see if win condition has been method
        if (this.y === 0) {
            console.log('win condition met');
        }

        // if collided with a bug, reset position
        // arrow notation to access external 'this'
        allEnemies.forEach((enemy) => {
            if (this.x < enemy.x + enemy.sprite.w
                && this.x + this.sprite.w > enemy.x
                && this.y < enemy.y + enemy.sprite.h
                && this.y + this.sprite.h > enemy.y
                ) {

                console.log('collision!');
            }
        });
    }

    handleInput(key) {
        // switch to handle what to do with each key press
        // check for out of bounds
        switch(key) {
            case 'up':
                if (this.y >= this.sprite.h * 0.5) { this.y -= this.sprite.h; }
                break;
            case 'down':
               if (this.y <= this.sprite.h * 4) { this.y += this.sprite.h; }
                break;
            case 'left':
                if (this.x >= this.sprite.w) { this.x -= this.sprite.w; }
                break;
            case 'right':
                if (this.x <= this.sprite.w * 3) { this.x += this.sprite.w; }
                break;
            default:
                console.log('invalid key');
                break;
        }
    }
}

// Place the player object in a variable called player
const player = new Player('images/char-boy.png');

// Place all enemy objects in an array called allEnemies
const allEnemies = [];

function spawnEnemy() {
    allEnemies.push(new Enemy('images/enemy-bug.png'));
}

// kick it off with one enemy
spawnEnemy();

// set a spawner that can be started and stopped later
// const enemySpawner = setInterval(spawnEnemy, 1800);

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