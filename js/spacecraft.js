var Spacecraft = function(canvas, inputManager, assetsManager) {
    this.canvas = canvas;
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
    this.accelerateFactor = 2;

    // collisions with walls detection
    this.isLeftWall = false;
    this.isRightWall = false;
    this.isUpWall = false;
    this.isDownWall = false;

    this.bulletDelayTimer = 0;
    this.bullets = [];
    this.isPoweredUp = false;
    this.bulletCleanUpDelayTimer = 0;

    this.isShieldAnimating = false;
    this.isShieldUp = false;
    this.shieldDuriation = 5000;
    this.shieldDelayTimer = 0;
    this.shieldIndex = 0;

    this.livesRemaining = 3;
};

Spacecraft.prototype.update = function(delta) {
    this.slowDown();
    this.updateDirection();

    this.yPosition += (this.yVelocity / 10);
    this.xPosition += (this.xVelocity / 10);

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

        //console.log("After: " + this.bullets.length);
        this.bulletCleanUpDelayTimer = 0;
    }

    // shield stuff
    if (this.isShieldAnimating && !this.isShieldUp) {
        this.shieldDelayTimer += delta;

        if (this.shieldDelayTimer > 500) {
            if (this.shieldIndex < 3) {
                this.shieldIndex++;
            } else {
                this.isShieldUp = true;
                this.isShieldAnimating = false;
            }

            this.shieldDelayTimer = 0;
        }
    } else if (this.isShieldAnimating && this.isShieldUp) {
        // shield down
        this.shieldDelayTimer += delta;

        if (this.shieldDelayTimer > 500) {
            if (this.shieldIndex > 0) {
                this.shieldIndex--;
            } else {
                this.shieldUp = false;
                this.isShieldAnimating = false;
            }
        }
    } else if (this.isShieldUp) {
        // count time
        this.shieldDelayTimer += delta;

        if (this.shieldDelayTimer > this.shieldDuriation) {
            // put the shield down
            this.isShieldAnimating = true;
            this.shieldDelayTimer = 0;
        }
    }
};

Spacecraft.prototype.draw = function(ctx) {
    for (var i = 0; i < this.bullets.length; i++) {
        this.bullets[i].draw(ctx);
    }

    ctx.drawImage(this.assetsManager.images["spacecraft"], this.xPosition,
            this.yPosition, this.width, this.height);

    // draw the spacecraft's damage
    if (this.livesRemaining == 2) {
        ctx.drawImage(this.assetsManager.images["spacecraftSmallDamage"], this.xPosition,
            this.yPosition, this.width, this.height);
    } else if (this.livesRemaining == 1) {
        ctx.drawImage(this.assetsManager.images["spacecraftMediumDamage"], this.xPosition,
            this.yPosition, this.width, this.height);
    } else if (this.livesRemaining == 0){
        ctx.drawImage(this.assetsManager.images["spacecraftBigDamage"], this.xPosition,
            this.yPosition, this.width, this.height);
    }

    // draw the shield
    if (this.shieldIndex > 0) {
        ctx.drawImage(this.assetsManager.images["shield" + this.shieldIndex], this.xPosition,
            this.yPosition, this.width, this.height);
    }
};

Spacecraft.prototype.slowDown = function() {
    // slow down when going up
    if (this.yVelocity < 0 && !this.inputManager.keys[38]) {
        this.yVelocity += this.accelerateFactor;
    }

    // slow down when going down
    if (this.yVelocity > 0 && !this.inputManager.keys[40]) {
        this.yVelocity -= this.accelerateFactor;
    }

    // slow down when going right
    if (this.xVelocity > 0 && !this.inputManager.keys[39]) {
        this.xVelocity -= this.accelerateFactor;
    }

    // slow down when going left
    if (this.xVelocity < 0 && !this.inputManager.keys[37]) {
        this.xVelocity += this.accelerateFactor;
    }
};

Spacecraft.prototype.updateDirection = function() {
    //console.log(this.isMovingHorizontally() + ", " + this.xVelocity + ", "
    //    + this.isMovingVertically() + ", " + this.yVelocity);

    // start moving up
    if (this.inputManager.keys[38] && this.yVelocity === 0 && !this.isUpWall) {
        this.yVelocity -= this.accelerateFactor;
        this.isDownWall = false;
    }

    // accelerate further up
    if (this.inputManager.keys[38] && (Math.abs(this.yVelocity) <= this.maxVelocity)) {
        this.yVelocity -= this.accelerateFactor;
    }

    // start moving down
    if (this.inputManager.keys[40] && this.yVelocity === 0 && !this.isDownWall) {
        this.yVelocity += this.accelerateFactor;
        this.isUpWall = false;
    }

    // accelerate further down
    if (this.inputManager.keys[40] && (Math.abs(this.yVelocity) <= this.maxVelocity)) {
        this.yVelocity += this.accelerateFactor;
    }

    // start moving right
    if (this.inputManager.keys[39] && this.xVelocity === 0 && !this.isRightWall) {
        this.xVelocity += this.accelerateFactor;
        this.isLeftWall = false;
    }

    // accelerate further right
    if (this.inputManager.keys[39] && (Math.abs(this.xVelocity) <= this.maxVelocity)) {
        this.xVelocity += this.accelerateFactor;
    }

    // start moving left
    if (this.inputManager.keys[37] && this.xVelocity === 0 && !this.isLeftWall) {
        this.xVelocity -= this.accelerateFactor;
        this.isRightWall = false;
    }

    // accelerate further left
    if (this.inputManager.keys[37] && (Math.abs(this.xVelocity) <= this.maxVelocity)) {
        this.xVelocity -= this.accelerateFactor;
    }
};

Spacecraft.prototype.fire = function(color) {
    if (color === "blue" || color === "green") {
        this.bullets.push(new Bullet(this.xPosition + (this.width / 2) - (14 / 2) ,
            this.yPosition, color, this.assetsManager));
    } else {
        console.error(color + " is not an appropriate color to fire a bullet!");
    }
};

Spacecraft.prototype.shieldUp = function() {
    this.isShieldAnimating = true;
};
