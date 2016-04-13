var Spacecraft = function(inputManager, assetsManager) {
    this.inputManager = inputManager;
    this.assetsManager = assetsManager;

    this.width = 90;
    this.height = 60;
    this.xPosition = 300 - (this.width / 2);
    this.yPosition = 600;
    this.mass = 500;
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.maxVelocity = 100;
    this.accelerateFactor = 2; //TODO not hard coded

    this.isGoingLeft = false;
    this.isGoingRight = false;
    this.isGoingUp = false;
    this.isGoingDown = false;

    this.bulletDelayTimer = 0;
    this.bullets = [];
    this.isPoweredUp = false;
    this.bulletCleanUpDelayTimer = 0;

    this.isShieldUp = false;
};

Spacecraft.prototype.update = function(delta) {
    this.slowDown();
    this.updateDirection();

    if (this.isGoingUp) {
        this.yPosition -= (this.yVelocity / 10); // avoid using 0.1 accelerateFactor
    } else if (this.isGoingDown) {
        this.yPosition += (this.yVelocity / 10);
    }

    if (this.isGoingRight) {
        this.xPosition += (this.xVelocity / 10);
    } else if (this.isGoingLeft) {
        this.xPosition -= (this.xVelocity / 10);
    }

    // fire normal bullet every second, powered up bullet every 0.3 second
    this.bulletDelayTimer += delta;

    if (!this.isPoweredUp && this.bulletDelayTimer > 1000) {
        this.fire("blue");
        this.bulletDelayTimer = 0;
    } else if (this.isPoweredUp && this.bulletDelayTimer > 300) {
        this.fire("green");
        this.bulletDelayTimer = 0;
    }

    for (var i = 0; i < this.bullets.length; i++) {
        this.bullets[i].update(delta);
    }

    // every 10 seconds remove bullets that are off the screen
    this.bulletCleanUpDelayTimer += delta;

    if (this.bulletCleanUpDelayTimer > 10000) {
        console.log("Before: " + this.bullets.length);
        for (var i = 0; i < this.bullets.length; i++) {
            if (this.bullets[i].yPosition < -50) {
                this.bullets.splice(i, 1);
                i--;
            }
        }

        console.log("After: " + this.bullets.length);
        this.bulletCleanUpDelayTimer = 0;
    }
};

Spacecraft.prototype.draw = function(ctx) {
    for (var i = 0; i < this.bullets.length; i++) {
        this.bullets[i].draw(ctx);
    }

    ctx.drawImage(this.assetsManager.images["spacecraft"], this.xPosition,
            this.yPosition, this.width, this.height);
};

Spacecraft.prototype.slowDown = function() {
    if (this.yVelocity > 0 && !this.inputManager.keys[38] && this.isGoingUp) {
        this.yVelocity -= this.accelerateFactor;
    }

    if (this.yVelocity > 0 && !this.inputManager.keys[40] && this.isGoingDown) {
        this.yVelocity -= this.accelerateFactor;
    }

    if (this.xVelocity > 0 && !this.inputManager.keys[39] && this.isGoingRight) {
        this.xVelocity -= this.accelerateFactor;
    }

    if (this.xVelocity > 0 && !this.inputManager.keys[37] && this.isGoingLeft) {
        this.xVelocity -= this.accelerateFactor;
    }
};

Spacecraft.prototype.updateDirection = function() {
    //console.log(this.isMovingHorizontally() + ", " + this.xVelocity + ", "
    //    + this.isMovingVertically() + ", " + this.yVelocity);

    // stop spacecraft vertically
    if (this.yVelocity === 0 && this.isMovingVertically()) {
        this.isGoingDown = false;
        this.isGoingUp = false;
    }

    // stop spacecraft horizontally
    if (this.xVelocity === 0 && this.isMovingHorizontally()) {
        this.isGoingLeft = false;
        this.isGoingRight = false;
    }

    // start moving up
    if (this.inputManager.keys[38] && this.yVelocity === 0) {
        this.yVelocity += this.accelerateFactor;
        this.isGoingUp = true;
    }

    // accelerate further up
    if (this.inputManager.keys[38] && this.isGoingUp
                            && this.yVelocity <= this.maxVelocity) {
        this.yVelocity += this.accelerateFactor;
    }

    // breaking when going up
    if (this.inputManager.keys[40] && this.isGoingUp
             && this.yVelocity > this.accelerateFactor) {
        this.yVelocity -= this.accelerateFactor;
    }

    // start moving down
    if (this.inputManager.keys[40] && this.yVelocity === 0) {
        this.yVelocity += this.accelerateFactor;
        this.isGoingDown = true;
    }

    // accelerate further down
    if (this.inputManager.keys[40] && this.isGoingDown
                            && this.yVelocity <= this.maxVelocity) {
        this.yVelocity += this.accelerateFactor;
    }

    // breaking when going down
    if (this.inputManager.keys[38] && this.isGoingDown
             && this.yVelocity > this.accelerateFactor) {
        this.yVelocity -= this.accelerateFactor;
    }

    // start moving right
    if (this.inputManager.keys[39] && this.xVelocity === 0) {
        this.xVelocity += this.accelerateFactor;
        this.isGoingRight = true;
    }

    // accelerate further right
    if (this.inputManager.keys[39] && this.isGoingRight
             && this.xVelocity <= this.maxVelocity) {
        this.xVelocity += this.accelerateFactor;
    }

    // breaking when going right
    if (this.inputManager.keys[37] && this.isGoingRight
            && this.xVelocity > this.accelerateFactor) {
        this.xVelocity -= this.accelerateFactor;
    }

    // start moving left
    if (this.inputManager.keys[37] && this.xVelocity === 0) {
        this.xVelocity += this.accelerateFactor;
        this.isGoingLeft = true;
    }

    // accelerate further left
    if (this.inputManager.keys[37] && this.isGoingLeft
            && this.xVelocity < this.maxVelocity) {
        this.xVelocity += this.accelerateFactor;
    }

    // breaking when going left
    if (this.inputManager.keys[39] && this.isGoingLeft
            && this.xVelocity > this.accelerateFactor) {
        this.xVelocity -= this.accelerateFactor;
    }
};

Spacecraft.prototype.isMovingHorizontally = function() {
    return this.isGoingRight || this.isGoingLeft;
};

Spacecraft.prototype.isMovingVertically = function() {
    return this.isGoingDown || this.isGoingUp;
};

Spacecraft.prototype.fire = function(color) {
    if (color === "blue" || color === "green") {
        this.bullets.push(new Bullet(this.xPosition + (this.width / 2) - (14 / 2) ,
            this.yPosition, color, this.assetsManager));
    } else {
        console.error(color + " is not an appropriate color to fire a bullet!");
    }
};