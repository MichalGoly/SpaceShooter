var Spacecraft = function(inputManager) {
    this.inputManager = inputManager;

    this.image = new Image();
    this.image.src = "assets/PNG/playerShip2_blue.png";
    this.width = 90;
    this.height = 60;
    this.xPosition = 300 - (this.width / 2);
    this.yPosition = 600;
    this.mass = 500;
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.maxVelocity = 10;
    this.accelerateFactor = 0.2; //TODO not hard coded

    this.isGoingLeft = false;
    this.isGoingRight = false;
    this.isGoingUp = false;
    this.isGoingDown = false;
};

Spacecraft.prototype.update = function() {
    this.slowDown();
    this.updateDirection();

    if (this.isGoingUp) {
        this.yPosition -= this.yVelocity;
    }
};

Spacecraft.prototype.draw = function(ctx) {
    ctx.drawImage(this.image, this.xPosition, this.yPosition, this.width, this.height);
};

Spacecraft.prototype.slowDown = function() {
    if (this.xVelocity > 0) {
        this.xVelocity -= this.accelerateFactor;
    }

    if (this.yVelocity > 0 && !this.inputManager.keys[38]) {
        this.yVelocity -= this.accelerateFactor;
    }
};

Spacecraft.prototype.updateDirection = function() {
    if (this.xVelocity === 0 && this.yVelocity === 0 && this.isMoving()) {
        // stop the craft
        this.isGoingLeft = false;
        this.isGoingRight = false;
        this.isGoingUp = false;
        this.isGoingDown = false;
    }

    if (this.inputManager.keys[38] && this.yVelocity === 0) {
        // lift off
        this.yVelocity += this.accelerateFactor;
        this.isGoingUp = true;
    }

    if (this.inputManager.keys[38] && this.isGoingUp
                            && this.yVelocity <= this.maxVelocity) {
        this.yVelocity += this.accelerateFactor;
    }
};

Spacecraft.prototype.isMoving = function() {
    return this.isGoingDown || this.isGoingLeft || this.isGoingRight || this.isGoingUp;
};