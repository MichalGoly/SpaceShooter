var Enemy = function(xPosition, yPosition, type, assetsManager, spacecraft) {
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.type = type;
    this.assetsManager = assetsManager;
    this.spacecraft = spacecraft;
    this.width = 55;
    this.height = 56;

    this.xVelocity = 0;
    this.yVelocity = 0;
    this.mass = 100;

    this.radius = this.width / 2;
    this.xCentre = this.xPosition + this.radius;
    this.yCentre = this.yPosition + this.radius;

    if (this.type === "enemyBlue" || this.type === "enemyGreen") {
        this.accelerateFactor = 1;
        this.maxVelocity = 7;
    } else {
        this.accelerateFactor = 1;
        this.maxVelocity = 20;
    }

    this.behaviourStarted = false;

    // for blue and red behaviour
    if (this.type === "enemyBlue" || this.type === "enemyRed") {
        // random value <100, 600>
        this.initialDescentDistance = Math.floor(Math.random() * (600 - 100 + 1)) + 100;
    }

    this.goDown = false;
    this.goUp = false;
    this.goRight = false;
    this.goLeft = false;

    this.isExploding = false;
    this.explosionTimer = 0;
    this.isExploded = false;
    this.explosionIndex = 0;


};

Enemy.prototype.update = function(delta) {
    if (this.isExploded) {
        return;
    }

    this.doBehaviour();
    this.slowDown();
    this.updateDirection();

    this.yPosition += (this.yVelocity / 10);
    this.xPosition += (this.xVelocity / 10);

    this.radius = this.width / 2;
    this.xCentre = this.xPosition + this.radius;
    this.yCentre = this.yPosition + this.radius;

    if (this.isExploding) {
        this.explosionTimer += delta;

        if (this.explosionTimer > 50) {
            this.explosionIndex++;
            this.explosionTimer = 0;
        }

        if (this.explosionIndex > 20) {
            // end enemy's life :)
            this.isExploded = true;
            this.isExploding = false;
        }
    }
};

Enemy.prototype.draw = function(ctx) {
    if (!this.isExploded && !this.isExploding) {
        ctx.drawImage(this.assetsManager.images[this.type], this.xPosition, this.yPosition,
            this.width, this.height);
    } else if (this.isExploding) {
        ctx.drawImage(this.assetsManager.images["explosion" + this.explosionIndex],
            this.xCentre - this.radius, this.yCentre - this.radius, this.radius * 2,
            this.radius * 2);
    }
};

Enemy.prototype.updateDirection = function() {
    // start moving up
    if (this.goUp && this.yVelocity === 0) {
        this.yVelocity -= this.accelerateFactor;
    }

    // accelerate further up
    if (this.goUp && (Math.abs(this.yVelocity) < this.maxVelocity)) {
        this.yVelocity -= this.accelerateFactor;
    }

    // start moving down
    if (this.goDown && this.yVelocity === 0) {
        this.yVelocity += this.accelerateFactor;
    }

    // accelerate further down
    if (this.goDown && (Math.abs(this.yVelocity) < this.maxVelocity)) {
        this.yVelocity += this.accelerateFactor;
    }

    // start moving right
    if (this.goRight && this.xVelocity === 0) {
        this.xVelocity += this.accelerateFactor;
    }

    // accelerate further right
    if (this.goRight && (Math.abs(this.xVelocity) < this.maxVelocity)) {
        this.xVelocity += this.accelerateFactor;
    }

    // start moving left
    if (this.goLeft && this.xVelocity === 0) {
        this.xVelocity -= this.accelerateFactor;
    }

    // accelerate further left
    if (this.goLeft && (Math.abs(this.xVelocity) < this.maxVelocity)) {
        this.xVelocity -= this.accelerateFactor;
    }
};

Enemy.prototype.slowDown = function() {
    // slow down when going up
    if (this.yVelocity < 0 && this.goDown) {
        this.yVelocity += this.accelerateFactor;
    }

    // slow down when going down
    if (this.yVelocity > 0 && this.goUp) {
        this.yVelocity -= this.accelerateFactor;
    }

    // slow down when going right
    if (this.xVelocity > 0 && this.goLeft) {
        this.xVelocity -= this.accelerateFactor;
    }

    // slow down when going left
    if (this.xVelocity < 0 && this.goRight) {
        this.xVelocity += this.accelerateFactor;
    }
};

Enemy.prototype.doBehaviour = function() {
    if (this.type === "enemyBlue") {
        this.doBlueBehaviour();
    } else if (this.type === "enemyRed") {
        this.doRedBehaviour();
    } else if (this.type === "enemyGreen") {
        this.doGreenBehaviour();
    } else if (this.type === "enemyRed") {
        this.doBlackBehaviour();
    }
};

// slowly fly into the spacecraft, don't shoot
Enemy.prototype.doBlueBehaviour = function() {
    if (!this.behaviourStarted) {
        this.goDown = true;
        this.behaviourStarted = true;
    } else {
        if (this.yPosition < 100) {
            return;
        }

        if (this.xCentre < this.spacecraft.xCentre) {
            this.goLeft = false;
            this.goRight = true;
        } else if (this.xCentre > this.spacecraft.xCentre) {
            this.goLeft = true;
            this.goRight = false;
        } else {
            this.goLeft = false;
            this.goRight = false;
        }
    }
};

Enemy.prototype.doRedBehaviour = function() {
    if (!this.behaviourStarted) {
        this.goDown = true;
        this.behaviourStarted = true;
    } else {
        if (this.yPosition < this.initialDescentDistance) {
            return;
        }

        if (this.xCentre < this.spacecraft.xCentre) {
            this.goLeft = false;
            this.goRight = true;
        } else if (this.xCentre > this.spacecraft.xCentre) {
            this.goLeft = true;
            this.goRight = false;
        } else {
            this.goLeft = false;
            this.goRight = false;
        }
    }
};

Enemy.prototype.doGreenBehaviour = function() {

};

Enemy.prototype.doBlackBehaviour = function() {

};

Enemy.prototype.explode = function() {
    this.isExploding = true;
};

Enemy.prototype.isOnFire = function() {
    return this.isExploded || this.isExploding;
};