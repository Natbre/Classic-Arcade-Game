//setting the basic values for lives and points
let smallWin = 0;
let points = document.querySelector('span.points');

let lives = document.querySelector('span.lives');
lives.textContent = 5;
let live = 5;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // this.sprite = 'images/Rock.png';

    // this.innerHeight(40);
    // this.innerWidth(40);
    this.x = (Math.floor(Math.random() * (-2000)) + 2);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// Enemy.prototype.constructor = Enemy;
Enemy.prototype.update = function(dt) {
    this.x += dt * 120;
    this.y = 60;

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    for (let i = 0; i < allEnemies.length; i++) {
        allEnemies[i].y = allEnemies[i].y + 80;
        if (allEnemies[i].y > 250) {
            allEnemies[i].y = 60;
        } else  if (allEnemies[i].x >= 550) {
            allEnemies[i].x = 0;
        }
    }

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.className = "player";
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    // this.sprite = 'images/char-cat-girl.png';
    // this.sprite = 'images/char-horn-girl.png';
    // this.sprite = 'images/char-pink-girl.png';
    // this.sprite = 'images/char-princess-girl.png';
    // this.innerHeight(40);
    // this.innerWidth(40);
    this.x = 200;
    this.y = 400;


};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 404 || this.x < -83) {
        this.x = 200;
        this.y = 400;
    }

    if (this.y > 404) {
        this.x = 200;
        this.y = 400;
    }



    //checking the collision between player and enemy
    allEnemies.forEach(enem => {

        if ((enem.x + 40 >= this.x - 40 && enem.x + 40 <= this.x) && (enem.y >= this.y - 20 && enem.y <= this.y + 50)) {
            this.y = 400;

            live = live - 1;

            if (live < 0) {
                live = 0;
                //setting the alert when there are no more lives
                function reset() {

                    swal({
                        title: "I'm sorry. That's it for this game. Wanna try again?",
                        text: " This time you gained " + points.innerHTML + " points. Great job!",

                        button: {
                            text: "Aww yiss!",


                        }
                    });


                }
                setTimeout(reset, 50);

            }

            lives.textContent = parseInt(live);

        }


        if (this.y < -50) {

            smallWin = smallWin + 10;

            points.textContent = parseInt(smallWin);
            this.x = 200;
            this.y = 400;
        }

    });
    Player.prototype.handleInput = function(key) {
        var allowedMoves = {
            left: function() {
                this.x -= 101;
            }.bind(this),
            up: function() {
                this.y -= 83;
            }.bind(this),
            right: function() {
                this.x += 101;
            }.bind(this),
            down: function() {
                this.y += 83;
            }.bind(this)
        };

        return allowedMoves[key] && allowedMoves[key]();
    };
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [
    new Enemy(-90, 100),
    new Enemy(-90, 140),
    new Enemy(-360, 50),
    new Enemy(-800, 70),
    new Enemy(-20, 250),
    new Enemy(-765, 250)
];
const player = new Player();


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