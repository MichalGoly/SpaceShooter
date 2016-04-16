var CollisionManager = function(game) {
    this.game = game;
    this.spacecraft = game.spacecraft;
    this.meteors = game.meteors;
    this.powerUps = game.powerUps;

    this.collisionDelayTimer = 0;
};

CollisionManager.prototype.checkAndResolve = function(delta) {
    this.collisionDelayTimer += delta;

    if (this.collisionDelayTimer > 10) {
        this.checkMeteorsWithMeteors();
        this.collisionDelayTimer = 0;
    }

    this.checkSpacecraftWithWalls();
    this.checkSpacecraftWithPowerUps();
};

CollisionManager.prototype.checkMeteorsWithMeteors = function() {
    if (this.meteors.length < 2) {
        return;
    }

    for (var i = 0; i < this.meteors.length - 1; i++) {
        var distanceX = this.meteors[i].xCentre - this.meteors[i + 1].xCentre;
        var distanceY = this.meteors[i].yCentre - this.meteors[i + 1].yCentre;
        var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        // 2D circle collision detection
        if (this.meteors[i].radius + this.meteors[i + 1].radius > distance) {
            console.log("COLLISION METEORS");

            var tempVelX = this.meteors[i].xVelocity;
            var tempVelY = this.meteors[i].yVelocity;
            var totalMass = this.meteors[i].mass + this.meteors[i + 1].mass;

            //console.log("HEHE " + tempVelX + ", " + tempVelY);

            // velocity after elastic collision
            this.meteors[i].xVelocity = (this.meteors[i].xVelocity
                * (this.meteors[i].mass - this.meteors[i + 1].mass) + 2
                * this.meteors[i + 1].mass * this.meteors[i + 1].xVelocity) / totalMass;

            this.meteors[i].yVelocity = (this.meteors[i].yVelocity
                * (this.meteors[i].mass - this.meteors[i + 1].mass) + 2
                * this.meteors[i + 1].mass * this.meteors[i + 1].yVelocity) / totalMass;

            this.meteors[i + 1].xVelocity = (this.meteors[i + 1].xVelocity
                * (this.meteors[i + 1].mass - this.meteors[i].mass) + 2
                * this.meteors[i].mass * tempVelX) / totalMass;

            this.meteors[i + 1].yVelocity = (this.meteors[i + 1].yVelocity
                * (this.meteors[i + 1].mass - this.meteors[i].mass) + 2
                * this.meteors[i].mass * tempVelY) / totalMass;


            //console.log("ax:" + this.meteors[i].xVelocity);
            //console.log("ay:" + this.meteors[i].yVelocity);
            //console.log("bx:" + this.meteors[i + 1].xVelocity);
            //console.log("by:" + this.meteors[i + 1].yVelocity);

            this.meteors[i].updateRotation(this.meteors[i + 1].xCentre);
            this.meteors[i + 1].updateRotation(this.meteors[i].xCentre);
        }
    }
};

CollisionManager.prototype.checkSpacecraftWithWalls = function() {
    if (this.spacecraft.xPosition < 5) {
        //console.log("LEFT");
        this.spacecraft.xVelocity = 0;
        this.spacecraft.isLeftWall = true;
        this.spacecraft.xPosition = 5;
    }

    if (this.spacecraft.xPosition + this.spacecraft.width + 5 > this.game.canvas.width) {
        //console.log("RIGHT");
        this.spacecraft.xVelocity = 0;
        this.spacecraft.isRightWall = true;
        this.spacecraft.xPosition = this.game.canvas.width - this.spacecraft.width - 5;
    }

    if (this.spacecraft.yPosition < 5) {
        //console.log("TOP");
        this.spacecraft.yVelocity = 0;
        this.spacecraft.isUpWall = true;
        this.spacecraft.yPosition = 5;
    }

    if (this.spacecraft.yPosition + this.spacecraft.height + 5 > this.game.canvas.height) {
        //console.log("BOTTOM");
        this.spacecraft.yVelocity = 0;
        this.spacecraft.isDownWall = true;
        this.spacecraft.yPosition = this.game.canvas.height - this.spacecraft.height - 5;
    }
};

CollisionManager.prototype.checkSpacecraftWithPowerUps = function() {
    // combine rectangular and circular collision detections
    for (var i = 0; i < this.powerUps.length; i++) {
        // rectangle-rectangle collision
        if (this.rectRectCollision(this.spacecraft, this.powerUps[i])) {
            if (this.circleRectCollision(this.spacecraft, this.powerUps[i])) {
                //console.log("SPACECRAFT-POWERUP COLLISION");
                if (this.powerUps[i].type === "boltPower") {
                    this.spacecraft.boltPowerUp();
                } else if (this.powerUps[i].type === "shieldPower") {
                    this.spacecraft.shieldUp();
                } else {
                    console.error(this.powerUps[i].type + " is not a proper powerUp");
                }
                this.powerUps[i].isPickedUp = true;
            }
        }
    }

    // clean up picked up power ups
    for (var i = 0; i < this.powerUps.length; i++) {
        if (this.powerUps[i].isPickedUp) {
            this.powerUps.splice(i, 1);
            i--;
        }
    }
};

CollisionManager.prototype.rectRectCollision = function(rect1, rect2) {
    return rect1.xPosition < rect2.xPosition + rect2.width
        && rect1.xPosition + rect1.width > rect2.xPosition
        && rect1.yPosition < rect2.yPosition + rect2.height
        && rect1.height + rect1.yPosition > rect2.yPosition;
};

// http://stackoverflow.com/questions/21089959/detecting-collision-of-rectangle-with-circle
CollisionManager.prototype.circleRectCollision = function(circle, rect) {
    var distanceX = Math.abs(circle.xCentre - rect.xPosition - rect.width / 2);
    var distanceY = Math.abs(circle.yCentre - rect.yPosition - rect.height / 2);

    if (distanceX > (rect.width / 2 + circle.radius)) {
        return false;
    }

    if (distanceY > (rect.height / 2 + circle.radius)) {
        return false;
    }

    if (distanceX <= (rect.width / 2)) {
        return true;
    }

    if (distanceY <= (rect.height / 2)) {
        return true;
    }

    var dx = distanceX - rect.width / 2;
    var dy = distanceY - rect.height / 2;

    return dx * dx + dy * dy <= (circle.radius * circle.radius);
};
























